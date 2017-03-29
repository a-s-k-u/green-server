function getPartySummary(){

    $userDetailsPath = [io.path]::combine($global:mainFolder,'Data\Party\UserIDList.csv');
    $parties = Import-Csv -Path $userDetailsPath | group Team

    $collectionWithItems = @()

    $parties | foreach-object {
       $collectionWithItems += New-Object psobject -Property @{
                TeamName = $_.Values[0]
                Count    = $_.Count
                }
    }

    return $collectionWithItems | ConvertTo-Json
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
