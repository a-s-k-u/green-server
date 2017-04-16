 
 $teamFolder = 'C:\Users\arun-\Documents\GitHub\green-server\One-Offs\PS-Offwired\Data\Team'
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
        $projectSummary.Owner = 'Someone'
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
