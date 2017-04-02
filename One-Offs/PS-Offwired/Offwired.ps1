function getPartySummary(){

    $userDetailsPath = [io.path]::combine($global:mainFolder,'Data\Party\UserIDList.csv');
    $parties = Import-Csv -Path $userDetailsPath | group Team

    $collectionWithItems = New-Object System.Collections.Generic.List[System.Object]

    $parties | foreach-object {

        $obj = New-Object psobject -Property @{
                TeamName = $_.Values[0]
                Count    = $_.Count
                }
        $collectionWithItems.Add($obj);
    }

    $c = New-Object psobject -Property @{
        data = $collectionWithItems
        }
     
     return ,$c | ConvertTo-Json
}

function getParties($team){

    $userDetailsPath = [io.path]::combine($global:mainFolder,'Data\Party\UserIDList.csv');
    #$teamName = '' + [string]$team
    #$teamName
    $teamName = $team.Trim();
    #$teamName
    $parties = Import-Csv -Path $userDetailsPath | Where-Object {$_.Team -eq $teamName}

    #$collectionWithItems = @(2)
    $collectionWithItems = New-Object System.Collections.Generic.List[System.Object]


    $parties | foreach-object {
       $obj = New-Object psobject -Property @{
                Id	      = $_.Id
                Name      = $_.Name
               	Team      = $_.Team
               	Location  = $_.Location
               	Role      = $_.Role
                DeskPhone = $_.Deskphone
                MobPhone  = $_.MobPhone	
                Email     = $_.Email
                Gender    = $_.Gender
                Avatar    = $_.Avatar
                }
       $collectionWithItems.Add($obj);
    }

    return ,$collectionWithItems | ConvertTo-Json
}

function getProjects(){

    $projectDetailsPath = [io.path]::combine($global:mainFolder,'Data\Team\Project-Details.csv');
    $projects = Import-Csv -Path $projectDetailsPath

    $collectionWithItems = New-Object System.Collections.Generic.List[System.Object]


    $projects | foreach-object {
       $obj = New-Object psobject -Property @{
                Id	             = $_.Id
                Name             = $_.Name
               	Description      = $_.Description
               	StartDate        = $_.StartDate
               	PointsCompleted  = $_.PointsCompleted
                PointsTotal      = $_.PointsTotal
                Owner            = $_.Owner	
                Priority         = $_.Priority
                Status           = $_.Status
                }
       $collectionWithItems.Add($obj);
    }

    return ,$collectionWithItems | ConvertTo-Json
}

function getWorkItems(){

    $workItemsPath = [io.path]::combine($global:mainFolder,'Data\Team\Jade-WorkItems.csv');
    $workItems = Import-Csv -Path $workItemsPath

    $todo  = New-Object System.Collections.Generic.List[System.Object]
    $doing = New-Object System.Collections.Generic.List[System.Object]
    $done  = New-Object System.Collections.Generic.List[System.Object]

    $workItems | foreach-object {
       $obj = New-Object psobject -Property @{
                Id	        = $_.Id
                Name        = $_.Name
               	Status      = $_.Status
               	Owner       = $_.Owner
               	StoryPoints = $_.StoryPoints
                }
       if ($_.Status -eq 'Doing'){
          $doing.Add($obj);
       }elseif ($_.Status -eq 'Done'){
          $done.Add($obj);
       }else{
           $todo.Add($obj);
       }

    }

    $c = New-Object psobject -Property @{
        todo   = $todo
        doing  = $doing
        done   = $done
        }
     
     return ,$c | ConvertTo-Json
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
