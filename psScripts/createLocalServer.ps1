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
$path=$args[0]
#----------------------------------------------------------------
"Checking for configuration file at path " + $path 
$configFilePath = [io.path]::combine($path,'app.csv')  # using .NET Path class instead of join-path commandlet for consistency.
#----------------------------------------------------------------
"Reading Configuration File " + $configFilePath
$appConfig = Import-Csv -Path $configFilePath
#----------------------------------------------------------------
$Pages=@{}
$GET_APIs = @{}
foreach($r in $appConfig)
{
    if ( $r.Type -eq 'Page')
    {
    $Pages[$r.URI + '[0]']=$r.Location
    }
    elseif ( $r.Type -eq 'GET')
    {
    $GET_APIs[$r.URI + '[' + $r.Params + ']'] = $r.Location
    }
    elseif ( $r.Type -eq 'ScriptFile' )
    {
       $scriptPath = [io.path]::combine($path,$r.Location)
      . $scriptPath
    }
}
#----------------------------------------------------------------
ShowSampleString
" Pages - " + $Pages
$listener = New-Object Net.HttpListener
$listener.Prefixes.Add("http://localhost:8081/")
"Starting the local server at port 8081"
$listener.Start()
"Local server started and server listening to port 8081"

"Opening the browser"
Start-Process -FilePath "http://localhost:8081/home"
"Browser Opened with the url to local server"
While ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    "Raw URL " + $request.RawUrl

    $scriptpath = $MyInvocation.MyCommand.Path
    $dir = Split-Path $scriptpath
    Write-host "My directory is $dir"

    $paramCount =  $request.Url.Segments.Count - 2
    $thisPage = $Pages['/' + $request.Url.Segments[1] + '[0]']
    $thisGETAPI = $GET_APIs['/' + $request.Url.Segments[1] + '[' + $paramCount + ']']

    if($thisPage)
    {
        $pagePath = [io.path]::combine($path,$thisPage) 
        $page = Get-Content -Path ($pagePath) -Raw
    }
    elseif ($thisGETAPI) 
    {   
        $args = "";  
        for ($i=1; $i -le $paramCount; $i++)
            {
              $args = $args + " " + $request.Url.Segments[$i + 2]
            } 
        &($thisGETAPI + ' ' + $args)

    }
    elseif ($request.RawUrl.ToLower().StartsWith("/party"))
    {
    $partyID = $context.Request.QueryString["id"];
    $page = $partyID
    }
    else
    {
    $page = Get-Content -Path ($path + '/index.html') -Raw
    #$page = $page.Replace('js/',$path + '/js/');
    #$page = $page.Replace('css/',$path + '/css/');
    #$page = $page.Replace('images/',$path + '/images/') 
    #$page = $page.Replace('pages/',$path + '/pages/')      
    }
    $response = $context.Response
    $response.Headers.Add("Content-Type","text/html")
    $buffer = [System.Text.Encoding]::UTF8.GetBytes($page)
    $response.ContentLength64 = $buffer.Length
    $response.OutputStream.Write($buffer,0,$buffer.Length)
    $response.Close()
    "Response sent to browser"
}
$listener.Stop()
