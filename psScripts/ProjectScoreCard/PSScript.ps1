function getIdeas
{
$dataPath = [io.path]::combine($global:projectFolder,'DataFolder\ideas.csv')
$a = Import-Csv -Path $dataPath | ConvertTo-Json
return $a
}
function getSlides
{
$slidesPath = [io.path]::combine($global:projectFolder,'DataFolder\Slides.csv')
$a = Import-Csv -Path $slidesPath | ConvertTo-Json
return $a
}
function getHome
{
return ''
}
function postIdeas($idea)
{
Write-Host $idea
Write-Host $idea.ideaName
Write-Host $idea.ideaDescription
return $idea | ConvertTo-Json
}

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

function postUpdateScore($score){
    $id = $score.scoreID
    Write-Host 'ScoreCardID - ' + $id  
    $scoreCardPath = [io.path]::combine($global:projectFolder,'DataFolder\scoreCards.csv');
    $csv = Import-Csv -Path $scoreCardPath

    $csv | ForEach {
    if ( ($_.ScoreCardID -match $id) -and ( $_.ScoreType -eq 'Feasibility') ){
        $_.Item1 = $score.Feasibility[0].SelectedValue
        $_.Item2 = $score.Feasibility[1].SelectedValue
        $_.Item3 = $score.Feasibility[2].SelectedValue
        $_.Item4 = $score.Feasibility[3].SelectedValue
        $_.Item5 = $score.Feasibility[4].SelectedValue
        $_.Item6 = $score.Feasibility[5].SelectedValue
        $_.Item7 = $score.Feasibility[6].SelectedValue
        $_.Item8 = $score.Feasibility[7].SelectedValue
        $_.Item9 = $score.Feasibility[8].SelectedValue
        $_.Item10 = $score.Feasibility[9].SelectedValue
    }elseif ( ($_.ScoreCardID -match $id) -and ( $_.ScoreType -eq 'Risk') ){
     $_.Item1 = $score.Risk[0].SelectedValue
        $_.Item2 = $score.Risk[1].SelectedValue
        $_.Item3 = $score.Risk[2].SelectedValue
        $_.Item4 = $score.Risk[3].SelectedValue
        $_.Item5 = $score.Risk[4].SelectedValue
        $_.Item6 = $score.Risk[5].SelectedValue
        $_.Item7 = $score.Risk[6].SelectedValue
        $_.Item8 = $score.Risk[7].SelectedValue
        $_.Item9 = $score.Risk[8].SelectedValue
        $_.Item10 = $score.Risk[9].SelectedValue
    } else {
    Write-Host $_.ScoreCardID ' came here'
    }

    }
    $csv | Export-Csv $scoreCardPath -NoTypeInformation

    Write-Host $score
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

function getFeasibilityRatings($id){
    $feasibilityPath = [io.path]::combine($global:projectFolder,'DataFolder\feasibilityFactor.csv'); #'C:\Users\i84446\Downloads\green-server-master\green-server-master\psScripts\ProjectScoreCard\DataFolder\feasibilityFactor.csv';
    $scoreCardPath = [io.path]::combine($global:projectFolder,'DataFolder\scoreCards.csv'); #'C:\Users\i84446\Downloads\green-server-master\green-server-master\psScripts\ProjectScoreCard\DataFolder\scoreCards.csv';
    $feasibilityRatings = Import-Csv -Path $feasibilityPath
    $feasibilityScore = Import-Csv -Path $scoreCardPath | Where-Object {$_.ScoreCardID -eq $id -and $_.ScoreType -eq 'Feasibility'}

    $feasibilityRatings|
       ForEach-Object {
         $key = 'Item' + $_.ID
          $_.SelectedValue= $feasibilityScore | Select -ExpandProperty $key
        }
    return $feasibilityRatings | ConvertTo-Json
}

function getAllScores(){
    $scoreCardPath = [io.path]::combine($global:projectFolder,'DataFolder\scoreCards.csv');
  #  $scoreCards = Import-Csv -Path $scoreCardPath | Where-Object {$_.ScoreType -eq 'Feasibility'} | ConvertTo-Json
  #  return $scoreCards

    #$scoreCardPath = [io.path]::combine('C:\Users\i84446\Downloads\green-server-master\green-server-master\psScripts\ProjectScoreCard\DataFolder\scoreCards.csv');

    $collectionWithItems = @()

    $scoreCards = Import-Csv -Path $scoreCardPath
    $scoreCount = $scoreCards.Length / 2

    for ( $i = 0; $i -lt $scoreCount; $i++)
    {
   
        $collectionWithItems += New-Object psobject -Property @{
            name = ""
            shortName=""
            ScoreCardID=0
            x = 0
            y = 0
            z = 0
            }
    }


    $scoreCards | foreach-object {
        if($_.ScoreType -eq 'Feasibility'){
        [int]$count = [int]$_.Item1 + [int]$_.Item2 + [int]$_.Item3 + [int]$_.Item4 + [int]$_.Item5 + [int]$_.Item6 + [int]$_.Item7 + [int]$_.Item8 + [int]$_.Item9 + [int]$_.Item10
        $collectionWithItems[$_.ScoreCardID - 1].x = $count
        $collectionWithItems[$_.ScoreCardID - 1].name = $_.ProcessName
        $collectionWithItems[$_.ScoreCardID - 1].ScoreCardID = $_.ScoreCardID
        } elseif ($_.ScoreType -eq 'Risk'){
        $collectionWithItems[$_.ScoreCardID - 1].y = [int]$_.Item1 + [int]$_.Item2 + [int]$_.Item3 + [int]$_.Item4 + [int]$_.Item5 + [int]$_.Item6 + [int]$_.Item7 + [int]$_.Item8 + [int]$_.Item9 + [int]$_.Item10
        $collectionWithItems[$_.ScoreCardID - 1].z = 10
        }
    }

    return $collectionWithItems | ConvertTo-Json

}

function getScore($id){
        [string]$scoreID = [convert]::ToString($id, 10)

        $feasibilityPath = [io.path]::combine($global:projectFolder,'DataFolder\feasibilityFactor.csv');
        $riskPath = [io.path]::combine($global:projectFolder,'DataFolder\riskFactor.csv');
        $scoreCardPath = [io.path]::combine($global:projectFolder,'DataFolder\scoreCards.csv');
        
        $feasibilityRatings = Import-Csv -Path $feasibilityPath
        $feasibilityScore = Import-Csv -Path $scoreCardPath | Where-Object {$_.ScoreCardID -eq $scoreID -and $_.ScoreType -eq 'Feasibility'}

        $feasibilityRatings|
           ForEach-Object {
             $key = 'Item' + $_.ID
              $_.SelectedValue= $feasibilityScore | Select -ExpandProperty $key
            }

        $riskRatings = Import-Csv -Path $riskPath
        $riskScore = Import-Csv -Path $scoreCardPath | Where-Object {$_.ScoreCardID -eq $scoreID -and $_.ScoreType -eq 'Risk'}

        $riskRatings |
           ForEach-Object {
             $key = 'Item' + $_.ID
              $_.SelectedValue= $riskScore | Select -ExpandProperty $key
        }

       $c = New-Object psobject -Property @{
        Name = "Scores"
        TotalFeasibility = 0
        TotalRisk = 0
        scoreID = $scoreID
        Feasibility = $feasibilityRatings
        Risk = $riskRatings
        }
     return $c | ConvertTo-Json
}
