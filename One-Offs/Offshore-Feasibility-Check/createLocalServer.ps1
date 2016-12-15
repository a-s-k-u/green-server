#* FileName: createLocalServer.ps1
 #*=============================================================================
 #* Script Name: createLocalServer
 #* Created:     [27/11/2015]
 #* Author:      Arun Sree Kumar
 #* Email:       arun-sree-kumar@outlook.com
 #*
 #*=============================================================================
 
#*=============================================================================
 #* REVISION HISTORY
 #*=============================================================================
 #* Date: [27/11/2015]
 #* Description: Initial Version for Digitalization Campaign.
 #*
 #*=============================================================================
"Control reached powershell - setting up a local server/listener"
#----------------------------------------------------------------
$global:projectFolder = $args[0] #'\\s81dsp01data01\ACIS-Udrive\Users\I84446\Profile_data\Desktop\feasibilityCheck\green-server-master\psScripts\Questionnaire_FeasibilityCheck' 
#'args - 0 is ' + $args[0]
#----------------------------------------------------------------
#"Including PS Script"
#$scriptPath = [io.path]::combine($global:projectFolder,'PSScript.ps1')
#. $scriptPath


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

function postUpdateAllBatches($score){
        $userID = [Environment]::UserName
        $scoreCardPath = [io.path]::combine($global:projectFolder,'DataFolder\ScoreCards\' + $userID + '.csv');
        
        updateScoreWithBatch $score.Batch01 $scoreCardPath $score.questionnaireID 1;
        updateScoreWithBatch $score.Batch02 $scoreCardPath $score.questionnaireID 2;
        updateScoreWithBatch $score.Batch03 $scoreCardPath $score.questionnaireID 3;
        updateScoreWithBatch $score.Batch04 $scoreCardPath $score.questionnaireID 4;
        updateScoreWithBatch $score.Batch05 $scoreCardPath $score.questionnaireID 5;

        return $score | ConvertTo-Json
}
<# Private function #>
function updateScoreWithBatch($currentBatch, $scoreCardPath, $questionnaireId, $batchID){
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
        if ( ($_.QuestionnaireID -match $questionnaireId) -and ( $_.BatchID -eq $batchID) ){
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
}

<# Private function #>
function getColor($curent,$max){
   [double]$perc = ([int]$curent / [int]$max ) * 100;
   if($perc -gt 80){ return 'successColor'}
   elseif($perc -lt 60){ return 'dangerColor'}
   elseif($perc -eq 0){return 'infoColor'}
   else{ return 'warningColor'}
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
            $color = "#FFBF00"
            $batch01Total = 0
            $batch02Total = 0
            $batch03Total = 0
            $batch04Total = 0
            $batch05Total = 0
            $batch01Max = 15
            $batch02Max = 15
            $batch03Max = 40
            $batch04Max = 80
            $batch05Max = 10

            $feasibilityTotal = 0
            $riskTotal = 0
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
               elseif ( ($_.BatchID -eq 3) -and ($_.Total -ne '')){
                 $batch03Total = [INT]$_.Total
               }
               elseif ( ($_.BatchID -eq 4) -and ($_.Total -ne '')){
                 $batch04Total = [INT]$_.Total
               }
               elseif ( ($_.BatchID -eq 5) -and ($_.Total -ne '')){
                 $batch05Total = [INT]$_.Total
               }              
            }

            $feasibilityTotal = $batch01Total + $batch02Total + $batch03Total + $batch05Total;
            $riskTotal = $batch04Total;
            

            if ( $riskTotal -gt (80 - $feasibilityTotal)){
            $color = 'green'
            }elseif ($riskTotal -lt (40 - $feasibilityTotal )){
            $color = 'red'
            }
            $collectionWithItems += New-Object psobject -Property @{
                name = $qName
                shortName=""
                questionnaireID=$_.Name
                status=$qStatus
                x = $feasibilityTotal 
                y = $riskTotal
                z = 5
                color= $color
                batch01Color = getColor $batch01Total $batch01Max
                batch02Color = getColor $batch02Total $batch02Max
                batch03Color = getColor $batch03Total $batch03Max
                batch04Color = getColor $batch04Total $batch04Max
                batch05Color = getColor $batch05Total $batch05Max
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
                                        batch03Status = $batch03Status
                                        batch04=$batch04
                                        batch04Status = $batch04Status
                                        batch05=$batch05
                                        batch05Status = $batch05Status
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

#----------------------------------------------------------------

$listener = New-Object Net.HttpListener
$listener.Prefixes.Add("http://localhost:8081/")
"Starting the local server at port 8081"
$listener.Start()
"Local server started and server listening to port 8081"

"Opening the browser"
Start-Process -FilePath "http://localhost:8081/index.html"
"Browser Opened with the url to local server"

try{

    While ($listener.IsListening){
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        "Debug: Raw URL " + $request.RawUrl

        <#
        $scriptpath = $MyInvocation.MyCommand.Path
        $dir = Split-Path $scriptpath
        Write-host "My directory is $dir"
        #>

        if ($request.RawUrl -Match ".html"){
            $pagePath = [io.path]::combine($global:projectFolder,$request.RawUrl.TrimStart("/")) 
            $page = Get-Content -Path ($pagePath) -Raw
            $response.Headers.Add("Content-Type","text/html")
        }
        elseif($request.RawUrl -Match ".js"){
            $jsPath = [io.path]::combine($global:projectFolder,$request.RawUrl.TrimStart("/")) 
            $page = Get-Content -Path ($jsPath) -Raw 
            $response.Headers.Add("Content-Type","application/javascript") 
        }
        elseif($request.RawUrl -Match ".css"){
            $cssPath = [io.path]::combine($global:projectFolder,$request.RawUrl.TrimStart("/")) 
            $page = Get-Content -Path ($cssPath) -Raw 
            $response.Headers.Add("Content-Type","text/css") 
        }
        elseif($request.RawUrl -Match ".ico"){
            $page = ''
            $response.Headers.Add("Content-Type","text/html")
        }
        elseif($request.HttpMethod.ToUpper() -eq 'GET'){
            $paramCount =  $request.Url.Segments.Count - 2
            Write-Host $request.Url.Segments;
            $args = "";  
            for ($i=1; $i -le $paramCount; $i++)
                {
                  $args = $args + " " + $request.Url.Segments[$i + 1].TrimEnd('/')
                } 
            #if($args -ne "") { $args = ' ' + $args } # adding a space seperator before calling the arguements


            $methodName = $request.HttpMethod + $request.Url.Segments[1].TrimEnd('/')
            $JSON = $args
            $exp = $methodName + ' $JSON'
            $page = Invoke-Expression $exp
            #$page = &($methodName + $args)
            $response.Headers.Add("Content-Type","application/json")
        }
        elseif($request.HttpMethod.ToUpper() -eq 'POST'){
             $StreamReader = New-Object System.IO.StreamReader $request.InputStream
             $StreamData = $StreamReader.ReadToEnd()
             $JSON = $StreamData | ConvertFrom-Json
             $methodName = $request.HttpMethod + $request.Url.Segments[1]
             $exp = $methodName + ' $JSON'
             $page = Invoke-Expression $exp
             $response.Headers.Add("Content-Type","application/json")

        }
        else{
            $page = " incorrect URL"
            $response.Headers.Add("Content-Type","text/html")     
        }

        $buffer = [System.Text.Encoding]::UTF8.GetBytes($page)
        $response.ContentLength64 = $buffer.Length
        $response.OutputStream.Write($buffer,0,$buffer.Length)
        $response.Close()
        "Response sent to browser"
    }

} 
catch{
'BELOW EXCEPTION THROWN'
Write-Host $_.Exception.Message
Write-Host "Press any key to continue ..."
$x = $host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

}
finally{
    $listener.Stop()
    $listener.Close()
}

