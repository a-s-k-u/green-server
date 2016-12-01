 

function postCreateNewDimension($dimension)
{
    $scoreCardPath = [io.path]::combine($global:projectFolder,'DataFolder\scoreCards.csv');
    $csv = Import-Csv -Path $scoreCardPath
    $maxCount = 0
    $csv | ForEach {
      if($maxCount -lt [int]$_.ScoreCardID){
         $maxCount = [int]$_.ScoreCardID
      }
    }
    $maxCount =  $maxCount + 1
    $csv += New-Object psobject -Property @{
            ScoreCardID = $maxCount
            ProcessName= $dimension.DimensionName
            ScoreType= 'Feasibility'
            Item1 = 0
            Item2 = 0
            Item3 = 0
            Item4 = 0
            Item5 = 0
            Item6 = 0
            Item7 = 0
            Item8 = 0
            Item9 = 0
            Item10 = 0
            Total = 0
            }

    $csv += New-Object psobject -Property @{
            ScoreCardID = $maxCount
            ProcessName= $dimension.DimensionName
            ScoreType= 'Risk'
            Item1 = 0
            Item2 = 0
            Item3 = 0
            Item4 = 0
            Item5 = 0
            Item6 = 0
            Item7 = 0
            Item8 = 0
            Item9 = 0
            Item10 = 0
            Total = 0
            }
    $csv | Export-Csv $scoreCardPath -NoTypeInformation
    return $csv | ConvertTo-Json
}

　
function postUpdateBatch01($score){
        $userID = [Environment]::UserName
        $scoreCardPath = [io.path]::combine($global:projectFolder,'DataFolder\ScoreCards\' + $userID + '.csv');
        $questionnairePath = [io.path]::combine($global:projectFolder,'DataFolder\Questionnaire.csv');

        $currentBatch = $score.Batch01
        #----------------------to be a seperate method-----------------------
        #$batch01Questions = Import-Csv -Path $questionnairePath | Where-Object {$_.QuestionnaireID -eq $score.questionnaireID -and $_.BatchID -eq 1} #fetching one more time for security purposes that seem irrelevant now.
        $total = 0
        $currentBatch | ForEach { 
              if($_.SelectedValue -eq 'Option1'){
                $total = $total + $_.Option1Points
              }
              elseif($_.SelectedValue -eq 'Option2'){
                $total = $total + $_.Option2Points
              }
              elseif($_.SelectedValue -eq 'Option3'){
                $total = $total + $_.Option3Points
              }
              elseif($_.SelectedValue -eq 'Option4'){
                $total = $total + $_.Option4Points
              }
              elseif($_.SelectedValue -eq 'Option5'){
                $total = $total + $_.Option5Points
              }
        }
        #---------------------------------------------
        
        $csv = Import-Csv -Path $scoreCardPath
        $csv | ForEach {
        if ( ($_.QuestionnaireID -match $score.questionnaireID) -and ( $_.BatchID -eq 1) ){
            $_.Item1 = $currentBatch[0].SelectedValue
            $_.Item2 = $currentBatch[1].SelectedValue
            $_.Item3 = $currentBatch[2].SelectedValue
            $_.Item4 = $currentBatch[3].SelectedValue
            $_.Item5 = $currentBatch[4].SelectedValue
            $_.Item6 = $currentBatch[5].SelectedValue
            $_.Item7 = $currentBatch[6].SelectedValue
            $_.Item8 = $currentBatch[7].SelectedValue
            $_.Item9 = $currentBatch[8].SelectedValue
            $_.Item10 = $currentBatch[9].SelectedValue
            $_.Status = 'Submitted'
            $_.Total = $total
        }
        }
        $csv | Export-Csv $scoreCardPath -NoTypeInformation
        return $score | ConvertTo-Json
}

function postUpdateBatch02($score){
        $userID = [Environment]::UserName
        $scoreCardPath = [io.path]::combine($global:projectFolder,'DataFolder\ScoreCards\' + $userID + '.csv');
        $currentBatch = $score.Batch02
        #----------------------to be a seperate method-----------------------
        #$batch01Questions = Import-Csv -Path $questionnairePath | Where-Object {$_.QuestionnaireID -eq $score.questionnaireID -and $_.BatchID -eq 1} #fetching one more time for security purposes that seem irrelevant now.
        $total = 0
        $currentBatch | ForEach { 
              if($_.SelectedValue -eq 'Option1'){
                $total = $total + $_.Option1Points
              }
              elseif($_.SelectedValue -eq 'Option2'){
                $total = $total + $_.Option2Points
              }
              elseif($_.SelectedValue -eq 'Option3'){
                $total = $total + $_.Option3Points
              }
              elseif($_.SelectedValue -eq 'Option4'){
                $total = $total + $_.Option4Points
              }
              elseif($_.SelectedValue -eq 'Option5'){
                $total = $total + $_.Option5Points
              }
        }
        #---------------------------------------------
        $csv = Import-Csv -Path $scoreCardPath
        $csv | ForEach {
        if ( ($_.QuestionnaireID -match $score.questionnaireID) -and ( $_.BatchID -eq 2) ){
            $_.Item1 = $currentBatch[0].SelectedValue
            $_.Item2 = $currentBatch[1].SelectedValue
            $_.Item3 = $currentBatch[2].SelectedValue
            $_.Item4 = $currentBatch[3].SelectedValue
            $_.Item5 = $currentBatch[4].SelectedValue
            $_.Item6 = $currentBatch[5].SelectedValue
            $_.Item7 = $currentBatch[6].SelectedValue
            $_.Item8 = $currentBatch[7].SelectedValue
            $_.Item9 = $currentBatch[8].SelectedValue
            $_.Item10 = $currentBatch[9].SelectedValue
            $_.Status = 'Submitted'
            $_.Total = $total
        }
        }
        $csv | Export-Csv $scoreCardPath -NoTypeInformation
        return $score | ConvertTo-Json
}

　
function postUpdateAllBatches($score){
        $userID = [Environment]::UserName
        $scoreCardPath = [io.path]::combine($global:projectFolder,'DataFolder\ScoreCards\' + $userID + '.csv');
        $currentBatch = $score.Batch01
        #----------------------to be a seperate method-----------------------
        #$batch01Questions = Import-Csv -Path $questionnairePath | Where-Object {$_.QuestionnaireID -eq $score.questionnaireID -and $_.BatchID -eq 1} #fetching one more time for security purposes that seem irrelevant now.
        $total = 0
        $currentBatch | ForEach { 
              if($_.SelectedValue -eq 'Option1'){
                $total = $total + $_.Option1Points
              }
              elseif($_.SelectedValue -eq 'Option2'){
                $total = $total + $_.Option2Points
              }
              elseif($_.SelectedValue -eq 'Option3'){
                $total = $total + $_.Option3Points
              }
              elseif($_.SelectedValue -eq 'Option4'){
                $total = $total + $_.Option4Points
              }
              elseif($_.SelectedValue -eq 'Option5'){
                $total = $total + $_.Option5Points
              }
        }
        #---------------------------------------------
        
        $csv = Import-Csv -Path $scoreCardPath
        $csv | ForEach {
        if ( ($_.QuestionnaireID -match $score.questionnaireID) -and ( $_.BatchID -eq 1) ){
            $_.Item1 = $currentBatch[0].SelectedValue
            $_.Item2 = $currentBatch[1].SelectedValue
            $_.Item3 = $currentBatch[2].SelectedValue
            $_.Item4 = $currentBatch[3].SelectedValue
            $_.Item5 = $currentBatch[4].SelectedValue
            $_.Item6 = $currentBatch[5].SelectedValue
            $_.Item7 = $currentBatch[6].SelectedValue
            $_.Item8 = $currentBatch[7].SelectedValue
            $_.Item9 = $currentBatch[8].SelectedValue
            $_.Item10 = $currentBatch[9].SelectedValue
            $_.Status = 'Submitted'
            $_.Total = $total
        }
        }
        $csv | Export-Csv $scoreCardPath -NoTypeInformation
     
        $currentBatch = $score.Batch02
        #----------------------to be a seperate method-----------------------
        #$batch01Questions = Import-Csv -Path $questionnairePath | Where-Object {$_.QuestionnaireID -eq $score.questionnaireID -and $_.BatchID -eq 1} #fetching one more time for security purposes that seem irrelevant now.
        $total = 0
        $score.Batch02 | ForEach { 
              if($_.SelectedValue -eq 'Option1'){
                $total = $total + $_.Option1Points
              }
              elseif($_.SelectedValue -eq 'Option2'){
                $total = $total + $_.Option2Points
              }
              elseif($_.SelectedValue -eq 'Option3'){
                $total = $total + $_.Option3Points
              }
              elseif($_.SelectedValue -eq 'Option4'){
                $total = $total + $_.Option4Points
              }
              elseif($_.SelectedValue -eq 'Option5'){
                $total = $total + $_.Option5Points
              }
        }
        #---------------------------------------------
        $csv = Import-Csv -Path $scoreCardPath
        $csv | ForEach {
        if ( ($_.QuestionnaireID -match $score.questionnaireID) -and ( $_.BatchID -eq 2) ){
            $_.Item1 = $currentBatch[0].SelectedValue
            $_.Item2 = $currentBatch[1].SelectedValue
            $_.Item3 = $currentBatch[2].SelectedValue
            $_.Item4 = $currentBatch[3].SelectedValue
            $_.Item5 = $currentBatch[4].SelectedValue
            $_.Item6 = $currentBatch[5].SelectedValue
            $_.Item7 = $currentBatch[6].SelectedValue
            $_.Item8 = $currentBatch[7].SelectedValue
            $_.Item9 = $currentBatch[8].SelectedValue
            $_.Item10 = $currentBatch[9].SelectedValue
            $_.Status = 'Submitted'
            $_.Total = $total
        }
        }
        $csv | Export-Csv $scoreCardPath -NoTypeInformation
        return $score | ConvertTo-Json
}

　
function postDeleteScore($score){
    $id = $score.scoreID
    Write-Host 'ScoreCardID - ' + $id  
    $scoreCardPath = [io.path]::combine($global:projectFolder,'DataFolder\scoreCards.csv');
    $csv = Import-Csv -Path $scoreCardPath
    <#
    $csvNew = ( $csv | Select -First 1)
    $csv | ForEach {
    if ($_.ScoreCardID -match $id){
            $csvNew += $_
    } else {
    Write-Host $_.ScoreCardID ' came here'
    }
    
    }
    #>
    $csvNew = $csv | ? { $_.ScoreCardID -notmatch $id}
    $csvNew  | Export-Csv $scoreCardPath -NoTypeInformation

    Write-Host $score
    return $score | ConvertTo-Json
}

　
function getAllScores(){
        $userID = [Environment]::UserName
        $scoreCardPath = [io.path]::combine($global:projectFolder,'DataFolder\ScoreCards\' + $userID + '.csv');
        
        $isValid = Test-Path $scoreCardPath 
        if ($isValid -eq 0)
        {
        #$sampleScoreCardDetails = Import-Csv -Path [io.path]::combine($global:projectFolder,'DataFolder\SampleScoreCard.csv');
        $sampleFilePath = [io.path]::combine($global:projectFolder,'DataFolder\SampleScoreCard.csv');
        Copy-Item -Path $sampleFilePath -Destination $scoreCardPath
        #$sampleScoreCardDetails | Export-Csv $scoreCardPath
        } 

        $collectionWithItems = @()
    
        $scores = Import-Csv -Path $scoreCardPath | group { $_.QuestionnaireID}

　
        $scoreCount = $scores.Length

        $scores | foreach-object { 
            $qName = ""
            $qStatus = ""
            $color = "#FFC200"
            $batch01Total = 0
            $batch02Total = 0
            $_.Group | foreach-object {
               $qName = $_.QuestionnaireName
               $qStatus = $_.Status
               #Write-Host 'batch01' + $_.Total
               if ( ($_.BatchID -eq 1) -and ($_.Total -ne '') ){
                 $batch01Total = [INT]$_.Total
               }
               elseif ( ($_.BatchID -eq 2) -and ($_.Total -ne '')){
                 $batch02Total = [INT]$_.Total
               }
               
            }
            if ( $batch02Total -gt (60 - $batch01Total)){
            $color = 'green'
            }elseif ($batch02Total -lt (30 - $batch01Total )){
            $color = 'red'
            }
            $collectionWithItems += New-Object psobject -Property @{
                name = $qName
                shortName=""
                questionnaireID=$_.Name
                status=$qStatus
                x = $batch01Total 
                y = $batch02Total
                z = 10
                color= $color
                #fillColor = 'red'
                }
        }
        return $collectionWithItems | ConvertTo-Json

}

function getScore($id){

        [string]$scoreID = [convert]::ToString($id, 10)
        $userID = [Environment]::UserName

        $questionnairePath = [io.path]::combine($global:projectFolder,'DataFolder\Questionnaire.csv');
        $scoreCardPath = [io.path]::combine($global:projectFolder,'DataFolder\ScoreCards\' + $userID + '.csv');
        
        $questionnaireRatings = Import-Csv -Path $questionnairePath | Where-Object {$_.QuestionnaireID -eq $scoreID}
        $batch01 = $questionnaireRatings | Where-Object {$_.BatchID -eq 1}
        $batch01Score = Import-Csv -Path $scoreCardPath | Where-Object {$_.QuestionnaireID -eq $scoreID -and $_.BatchID -eq 1}
        $batch01Status = $batch01Score.Status
        #-----------------------------------------------
        Write-Host 'Batch01 status is ' 
        Write-Host $batch01Status
        $condition = $batch01Status -ne 'Submitted'
        Write-Host 'if it is not submitted = ' 
        Write-Host $condition 
        #-----------------------------------------------
        $batch01 |
           ForEach-Object {
             $key = 'Item' + $_.QuestionID
              $_.SelectedValue= $batch01Score | Select -ExpandProperty $key
              if($batch01Status -ne 'Submitted'){
                 $_.Comments = ''
              }
        }

        $batch02 = $questionnaireRatings | Where-Object {$_.BatchID -eq 2}
        $batch02Score = Import-Csv -Path $scoreCardPath | Where-Object {$_.QuestionnaireID -eq $scoreID -and $_.BatchID -eq 2}
        $batch02Status = $batch02Score.Status
        $batch02 |
           ForEach-Object {
             $key = 'Item' + $_.QuestionID
              $_.SelectedValue= $batch02Score | Select -ExpandProperty $key
              if($batch02Status -ne 'Submitted'){
                 $_.Comments = ''
              }
        }

        $batch03 = $questionnaireRatings | Where-Object {$_.BatchID -eq 3}
        $batch03Score = Import-Csv -Path $scoreCardPath | Where-Object {$_.QuestionnaireID -eq $scoreID -and $_.BatchID -eq 3}
        $batch03Status = $batch03Score.Status
        $batch03 |
           ForEach-Object {
             $key = 'Item' + $_.QuestionID
              $_.SelectedValue= $batch03Score | Select -ExpandProperty $key
              if($batch03Status -ne 'Submitted'){
                 $_.Comments = ''
              }
        }

        $batch04 = $questionnaireRatings | Where-Object {$_.BatchID -eq 4}
        $batch04Score = Import-Csv -Path $scoreCardPath | Where-Object {$_.QuestionnaireID -eq $scoreID -and $_.BatchID -eq 4}
        $batch04Status = $batch04Score.Status
        $batch04 |
           ForEach-Object {
             $key = 'Item' + $_.QuestionID
              $_.SelectedValue= $batch04Score | Select -ExpandProperty $key
              if($batch04Status -ne 'Submitted'){
                 $_.Comments = ''
              }
        }

        $batch05 = $questionnaireRatings | Where-Object {$_.BatchID -eq 5}
        $batch05Score = Import-Csv -Path $scoreCardPath | Where-Object {$_.QuestionnaireID -eq $scoreID -and $_.BatchID -eq 5}
        $batch05Status = $batch05Score.Status
        $batch05 |
           ForEach-Object {
             $key = 'Item' + $_.QuestionID
              $_.SelectedValue= $batch05Score | Select -ExpandProperty $key
              if($batch05Status -ne 'Submitted'){
                 $_.Comments = ''
              }
        }

        $collectionWithItems = @()
        $c = New-Object psobject -Property @{
                                        questionnaireID = $scoreID
                                        batch01=$batch01
                                        batch01Status=$batch01Status
                                        batch02=$batch02
                                        batch02Status = $batch02Status
                                        batch03=$batch03
                                        batch04=$batch04
                                        batch05=$batch05
                                        }
        return $c | ConvertTo-Json
}

function getLeadBoard(){
        $userLeads = @()
        $scoreCardFolderPath = [io.path]::combine($global:projectFolder,'DataFolder\ScoreCards');
        $userDetailsPath = [io.path]::combine($global:projectFolder,'DataFolder\UserList.csv');
        Get-ChildItem $scoreCardFolderPath -Filter *.csv | 
        Foreach-Object {
            $content = Import-Csv -Path $_.FullName
            $id = [io.path]::GetFileNameWithoutExtension($_.Name) 
            $name = Import-Csv -Path $userDetailsPath | Where-Object {$_.ID -eq $id }
            $total = 0
            $content | ForEach-Object {
                  $total = $total + [INT]$_.Total
            }
            $userLeads += New-Object psobject -Property @{
                        id = $id
                        name = $name.Name
                        score = $total
                        team = $name.Team
                        }
            $teamLeads = @()
            $userLeads | group { $_.team} | ForEach-Object {
                         $teamTotal = 0
                         $teamName = $_.Name
                         $_.Group | ForEach-Object{
                           $teamTotal = $teamTotal + [INT]$_.score
                            $teamLeads += New-Object psobject -Property @{
                                            teamName = $teamName
                                            teamScore = $teamTotal
                                            }
                         }
            }
        }
        #$collectionWithItems | ConvertTo-Json
        $c = New-Object psobject -Property @{
                                        userLeads = $userLeads
                                        teamLeads= $teamLeads
                                        }
        return $c | ConvertTo-Json
}

<#
$JSON = '1'
$methodName = 'getScore'
$exp = $methodName + ' $JSON'
$page = Invoke-Expression $exp
$page
#> 
