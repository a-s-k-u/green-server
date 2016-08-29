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
    $scoreCards = Import-Csv -Path $scoreCardPath | Where-Object {$_.ScoreType -eq 'Feasibility'} | ConvertTo-Json
    return $scoreCards
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
        Feasibility = $feasibilityRatings
        Risk = $riskRatings
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

