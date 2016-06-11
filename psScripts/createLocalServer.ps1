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
$configFilePath = [io.path]::combine($path,'app.config')  # using .NET Path class instead of join-path commandlet for consistency.
#----------------------------------------------------------------
"Reading Configuration File " + $configFilePath
$appConfig = Import-Csv -Path $configFilePath
$Pages=@{}
$APIs = @{}
foreach($r in $appConfig)
{
    if ( $r.Type = 'Page')
    {
    $Pages[$r.URI]=$r.Location
    }
    if ( $r.Type = 'API')
    {
    $APIs[$r.URI]=$r.Location
    }
}
#----------------------------------------------------------------

$listener = New-Object Net.HttpListener
$listener.Prefixes.Add("http://localhost:8081/")
"Starting the local server at port 8081"
$listener.Start()
"Local server started and server listening to port 8081"

"Opening the browser"
Start-Process -FilePath "http://localhost:8081/home/"
"Browser Opened with the url to local server"
While ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    "Raw URL " + $request.RawUrl
    $scriptpath = $MyInvocation.MyCommand.Path
    $dir = Split-Path $scriptpath
    Write-host "My directory is $dir"
    if ($request.RawUrl.ToLower().StartsWith("/parties/")) 
    {     
    $page = 'parties';    
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
