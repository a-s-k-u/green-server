function getPartySummaryapi(){

    $userDetailsPath = [io.path]::combine($global:mainFolder,'Data\Party\UserIDList.csv');
    #$parties = Import-Csv -Path $userDetailsPath | group Team
    $allparties = Import-Csv -Path $userDetailsPath 


    $collectionWithItems = New-Object System.Collections.Generic.List[System.Object]
    $partySummary01 = New-Object System.Collections.Generic.List[System.Object]
    $partySummary02 = New-Object System.Collections.Generic.List[System.Object]
    $partySummary03 = New-Object System.Collections.Generic.List[System.Object]
    $partySummary04 = New-Object System.Collections.Generic.List[System.Object]
    Import-Csv -Path $userDetailsPath | Where-Object {($_.Group -eq 'Group01') -and ($_.Placement -eq 'Offshore') } | group Team | foreach-object {
        $obj = New-Object psobject -Property @{
                TeamName = $_.Values[0]
                Count    = $_.Count
                }
        $partySummary01.Add($obj);
    }
    Import-Csv -Path $userDetailsPath | Where-Object {($_.Group -eq 'Group02')  -and ($_.Placement -eq 'Offshore') } | group Team | foreach-object {
        $obj = New-Object psobject -Property @{
                TeamName = $_.Values[0]
                Count    = $_.Count
                }
        $partySummary02.Add($obj);
    }
    Import-Csv -Path $userDetailsPath | Where-Object {($_.Group -eq 'Group03')  -and ($_.Placement -eq 'Offshore') } | group Team | foreach-object {
        $obj = New-Object psobject -Property @{
                TeamName = $_.Values[0]
                Count    = $_.Count
                }
        $partySummary03.Add($obj);
    }
    Import-Csv -Path $userDetailsPath | Where-Object {($_.Group -eq 'Group04')  -and ($_.Placement -eq 'Offshore') } | group Team | foreach-object {
        $obj = New-Object psobject -Property @{
                TeamName = $_.Values[0]
                Count    = $_.Count
                }
        $partySummary04.Add($obj);
    }
    $tagArray = New-Object System.Collections.Generic.List[System.Object]
   
    $allparties | foreach-object {
       if($_.Tags -ne ''){
       $tagNameList = $_.Tags.split(",")
       setTags ([ref]$tagNameList) 0 ([ref]$tagArray)
       }
    }
    <#
    $parties | foreach-object {

        $obj = New-Object psobject -Property @{
                TeamName = $_.Values[0]
                Count    = $_.Count
                }
        $collectionWithItems.Add($obj);
    }#>



    $c = New-Object psobject -Property @{
        #data = $collectionWithItems
        group01 = $partySummary01
        group02 = $partySummary02
        group03 = $partySummary03
        group04 = $partySummary04
        partytags    = $tagArray
        }
     
     return ,$c | ConvertTo-Json
}

function getPartiesapi($inputText){
        $userDetailsPath = [io.path]::combine($global:mainFolder,'Data\Party\UserIDList.csv');
        #$teamName = '' + [string]$team
        #$teamName
        $teamName = $inputText.Split(' ')[1].Trim();
        $placementName = $inputText.Split(' ')[2].Trim();
        #$teamName
        $parties = Import-Csv -Path $userDetailsPath | Where-Object {($_.Team -eq $teamName) -and ($_.Placement -eq $placementName)}

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
                    Group     = $_.Group
                    }
           $collectionWithItems.Add($obj);
        }

        return ,$collectionWithItems | ConvertTo-Json
 }
 function getPartiesTagapi($tag){
        $userDetailsPath = [io.path]::combine($global:mainFolder,'Data\Party\UserIDList.csv');
        #$teamName = '' + [string]$team
        #$teamName
        $tagName = [System.Web.HttpUtility]::UrlDecode($tag.Trim());
        #$teamName
        $parties = Import-Csv -Path $userDetailsPath | Where-Object {$_.Tags -match $tagName}

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
 function getPartyapi($id){
        $id = $id.trim()
        if($id -eq 'i0' ) {
        $id = [Environment]::UserName
        }
        $userDetailsPath = [io.path]::combine($global:mainFolder,'Data\Party\UserIDList.csv');
        $party = Import-Csv -Path $userDetailsPath | Where-Object {$_.Id -match $id}
        return $party | ConvertTo-Json
 }

function getProjectsapi(){

    $teamFolder = [io.path]::combine($global:mainFolder,'Data\Team');

    setProjectDetails($teamFolder) #to refresh the list.

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

function getWorkItemsapi($id){

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
function postWorkItemsapi($workItemInput)
{
    $workItemsPath = [io.path]::combine($global:mainFolder,'Data\Team\'+$workItemInput.projectName.Trim()+'-WorkItems.csv');
    $workItems = Import-Csv -Path $workItemsPath
    $nextWorkItemId = $workItems.length + 1
    $obj = New-Object psobject -Property @{
                Id	        = $nextWorkItemId
                DataType    = 'B'
                Name        = $workItemInput.taskName
               	Status      = 'Todo'
               	Owner       = [Environment]::UserName
               	StoryPoints = $workItemInput.storyPoints
                }
    $workItems += $obj
    
    $workItems | Export-Csv $workItemsPath -NoTypeInformation
    return $obj | ConvertTo-Json
}
function putWorkItemsapi($workItemInput)
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
function postPartyapi($party)
{
    $userDetailsPath = [io.path]::combine($global:mainFolder,'Data\Party\UserIDList.csv');
    $parties = Import-Csv -Path $userDetailsPath
    $newParty = New-Object psobject -Property @{
                Id	        = $party.Id
                Team        = $party.Team
                Name        = $party.Name
               	Email       = $party.Email
                DeskPhone   = $party.DeskPhone
                MobPhone    = $party.MobPhone
                Location    = $party.Location
                Avatar      = $party.Avatar
                Group       = $party.Group
                Placement   = $party.Placement
                ShortDescription = $party.ShortDescription
                }
    $parties += $newParty
    $parties | Export-Csv $userDetailsPath -NoTypeInformation
    return $newParty| ConvertTo-Json
}
function putPartyapi($party)
{
    $userDetailsPath = [io.path]::combine($global:mainFolder,'Data\Party\UserIDList.csv');
    $parties = Import-Csv -Path $userDetailsPath
    $parties | ForEach {
    if ($_.Id -match $party.Id){
       $_.Name = $party.Name
       $_.Email = $party.Email
       $_.DeskPhone = $party.DeskPhone
       $_.MobPhone = $party.MobPhone
       $_.Location = $party.Location
       $_.Avatar = $party.Avatar
       $_.ShortDescription = $party.ShortDescription
       $_.Tags = $party.Tags
    }
    }     
    $parties | Export-Csv $userDetailsPath -NoTypeInformation
    return $party| ConvertTo-Json
}


function getAllScoresapi(){
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

function postCloseSessionapi(){
  exit;
}

function setProjectDetails($teamFolder){
  
  $files = Get-ChildItem -Path $teamFolder

  $files | foreach-object {
     # handle individual Project files.
     $filePath = [io.path]::combine($teamFolder,$_.Name)
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
       }        
     }

     if($totalPoints -eq 0){
     $projectSummary.StoryPoints = 0
     }else{
     $projectSummary.StoryPoints = ($totalCompleted / $totalPoints)*100
     }
     $workItemsNew | Export-Csv $filePath -NoTypeInformation

  }#File loop

 }


 function setTags ([ref]$tagNameList, $count, [ref]$tagArray){ #recursive function to get field counts.
   $tagName = ($tagNameList.Value)[$count]
   $isTagPresent = $false;
   ($tagArray.Value) | foreach-object {
       if ($_.TeamName -eq $tagName){
          $_.Count += 1;
          $isTagPresent = $true;
       }
   }
   if ($isTagPresent -eq $false){
      $obj = New-Object psobject -Property @{
                TeamName = $tagName
                Count    = 1
                }
        ($tagArray.Value).Add($obj);
   }
   $count++;
   if ($count -lt ($tagNameList.Value).Count){
      setTags (([ref]$tagNameList).Value) $count (([ref]$tagArray).Value)
   }
}

