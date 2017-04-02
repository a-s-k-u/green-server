
$global:mainFolder = 'C:\Users\arun-\Documents\GitHub\green-server\One-Offs\PS-Offwired'

function getParties($team){

    $userDetailsPath = [io.path]::combine($global:mainFolder,'Data\Party\UserIDList.csv');
    $parties = Import-Csv -Path $userDetailsPath | Where-Object {$_.Team -eq $team}

    $collectionWithItems = @()

    $parties | foreach-object {
       $collectionWithItems += New-Object psobject -Property @{
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
    }

    return $collectionWithItems | ConvertTo-Json
}


$JSON = 'Jade'
$exp = $methodName + ' $JSON'
$page = Invoke-Expression $exp
$page