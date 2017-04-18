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
 function getParty($id){
        $id = $id.trim()
        if($id -match 'i0' ) {
        $id = [Environment]::UserName
        }
        $userDetailsPath = [io.path]::combine($global:mainFolder,'Data\Party\UserIDList.csv');
        $party = Import-Csv -Path $userDetailsPath | Where-Object {$_.Id -match $id}
        return $party | ConvertTo-Json
 }

function getProjects(){

    $teamFolder = [io.path]::combine($global:mainFolder,'Data\Team');
    $files = Get-ChildItem -Path $teamFolder
    $collectionWithItems = New-Object System.Collections.Generic.List[System.Object]

    $files | foreach-object {
         # handle individual Project files.
         $filePath = [io.path]::combine($teamFolder,$_.Name)
         $workItems = Import-Csv -Path $filePath
         $projectSummary =  $workItems | Where-Object {$_.DataType -eq 'A'}
         $collectionWithItems.Add($projectSummary);

     }#fileList
    return ,$collectionWithItems | ConvertTo-Json #the comma is to respond the collection as array instead of a single object for single element array.
}

function getWorkItems($id){

    $workItemsPath = [io.path]::combine($global:mainFolder,'Data\Team\'+$id.Trim()+'-WorkItems.csv');
    $workItems = Import-Csv -Path $workItemsPath

    $todo  = New-Object System.Collections.Generic.List[System.Object]
    $doing = New-Object System.Collections.Generic.List[System.Object]
    $done  = New-Object System.Collections.Generic.List[System.Object]

    $workItems | foreach-object {
       $obj = New-Object psobject -Property @{
                Id	        = $_.Id
                DataType    = $_.DataType
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
function postWorkItems($workItemInput)
{
    $workItemsPath = [io.path]::combine($global:mainFolder,'Data\Team\'+$workItemInput.projectName.Trim()+'-WorkItems.csv');
    $workItems = Import-Csv -Path $workItemsPath
    $nextWorkItemId = $workItems.length + 1
    $obj = New-Object psobject -Property @{
                Id	        = $nextWorkItemId
                DataType    = 'B'
                Name        = $workItemInput.taskName
               	Status      = 'Todo'
               	Owner       = 'someone'
               	StoryPoints = $workItemInput.storyPoints
                }
    $workItems += $obj
    
    $workItems | Export-Csv $workItemsPath -NoTypeInformation
    return $obj | ConvertTo-Json
}
function putWorkItems($workItemInput)
{
    $workItemsPath = [io.path]::combine($global:mainFolder,'Data\Team\'+$workItemInput.projectName.Trim()+'-WorkItems.csv');
    $workItems = Import-Csv -Path $workItemsPath
    $workItems | ForEach {
    if (( $_.Id -match $workItemInput.workItem.Id) -and ($workItemInput.workItem.DataType -eq 'B')){
       $_.Status = $workItemInput.toStatus
    }
    }     
    $workItems | Export-Csv $workItemsPath -NoTypeInformation
    return $workItemInput.workItem | ConvertTo-Json
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

function setProjectDetails($teamFolder){
  
  $files = Get-ChildItem -Path $teamFolder

  $files | foreach-object {
     # handle individual Project files.
     $filePath = [io.path]::combine($teamFolder,$_.Name)
     $filePath
     $workItems = Import-Csv -Path $filePath 
     $workItemsNew  = New-Object System.Collections.Generic.List[System.Object]
     $totalCompleted = 0
     $totalPoints = 0
     $projectSummary = $null;

     $workItems | foreach-object {
     
     if($_.DataType -eq 'A'){
      $projectSummary = New-Object psobject -Property @{
                DataType         = $_.DataType
                Id	             = $_.Id
                Name             = $_.Name
                Comments         = $_.Comments
               	Status           = $_.Status
               	Priority         = $_.Priority
               	Owner            = $_.Owner
                StoryPoints      = $_.StoryPoints
                StartDate        = $_.StartDate	
                ExpectedEndDate  = $_.ExpectedEndDate
                ActualEndDate    = $_.ActualEndDate
          }
          $workItemsNew.Add($projectSummary);
       }
       elseif($_.DataType -eq 'B'){
        $workItem = New-Object psobject -Property @{
                DataType         = $_.DataType
                Id	             = $_.Id
                Name             = $_.Name
                Comments         = $_.Comments
               	Status           = $_.Status
               	Priority         = $_.Priority
               	Owner            = $_.Owner
                StoryPoints      = $_.StoryPoints
                StartDate        = $_.StartDate	
                ExpectedEndDate  = $_.ExpectedEndDate
                ActualEndDate    = $_.ActualEndDate
          }

          $totalPoints = $totalPoints + $_.StoryPoints

          if($_.Status -eq 'Done'){
          $totalCompleted = $totalCompleted + $_.StoryPoints
          }
          $workItemsNew.Add($workItem);
          $totalCompleted 
          $totalPoints
       }        
     }

     if($totalPoints -eq 0){
     $projectSummary.StoryPoints = 0
     }else{
     $projectSummary.StoryPoints = ($totalCompleted / $totalPoints)*100
     }
     $projectSummary.StoryPoints
     $workItemsNew | Export-Csv $filePath -NoTypeInformation

  }#File loop

 }
