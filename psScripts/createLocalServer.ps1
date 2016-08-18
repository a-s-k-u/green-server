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
$global:projectFolder = $args[0]
'args - 0 is ' + $args[0]
#----------------------------------------------------------------
"Checking for configuration file at path " + $global:projectFolder
$configFilePath = [io.path]::combine($global:projectFolder,'app.csv')  # using .NET Path class instead of join-path commandlet for consistency.
#----------------------------------------------------------------
"Reading Configuration File " + $configFilePath
$appConfig = Import-Csv -Path $configFilePath
#----------------------------------------------------------------
$Pages=@{}
$JS=@{}
$CSS=@{}
$GET_APIs = @{}
foreach($r in $appConfig)
{
    if ( $r.Type -eq 'Page')
    {
    $Pages[$r.URI + '[0]']=$r.Location
    }
    if ( $r.Type -eq 'JS')
    {
    $JS[$r.URI + '[0]']=$r.Location
    }
    if ( $r.Type -eq 'CSS')
    {
    $CSS[$r.URI + '[0]']=$r.Location
    }
    elseif ( $r.Type -eq 'GET')
    {
    $GET_APIs[$r.URI + '[' + $r.Params + ']'] = $r.Location
    }
    elseif ( $r.Type -eq 'PSScriptFile' )
    {
       $scriptPath = [io.path]::combine($global:projectFolder,$r.Location)
      . $scriptPath
    }
}
#----------------------------------------------------------------
" Pages - " + $Pages.ToString();
$listener = New-Object Net.HttpListener
$listener.Prefixes.Add("http://localhost:8081/")
"Starting the local server at port 8081"
$listener.Start()
"Local server started and server listening to port 8081"

"Opening the browser"
Start-Process -FilePath "http://localhost:8081/home"
"Browser Opened with the url to local server"

try{

    While ($listener.IsListening){
        $context = $listener.GetContext()
        $request = $context.Request
        "Raw URL " + $request.RawUrl

        $scriptpath = $MyInvocation.MyCommand.Path
        $dir = Split-Path $scriptpath
        Write-host "My directory is $dir"

        $paramCount =  $request.Url.Segments.Count - 2
        $thisPage = $Pages['/' + $request.Url.Segments[1] + '[0]']
        $thisGETAPI = $GET_APIs['/' + $request.Url.Segments[1] + '[' + $paramCount + ']']
        $thisJSFile = $JS['/' + $request.Url.Segments[1] + '[0]']
        $thisCSSFile = $CSS['/' + $request.Url.Segments[1] + '[0]']

        'Debug : This Page is ' + $thisPage;
        'Debug : This JS File is ' + $thisJSFile;

         $response = $context.Response

        if($thisPage)
        {
            $pagePath = [io.path]::combine($global:projectFolder,$thisPage) 
            $page = Get-Content -Path ($pagePath) -Raw
            $response.Headers.Add("Content-Type","text/html")
        }
        elseif($thisJSFile)
        {
            $jsPath = [io.path]::combine($global:projectFolder,$thisJSFile) 
            $page = Get-Content -Path ($jsPath) -Raw 
            $response.Headers.Add("Content-Type","application/javascript") 
        }
        elseif($thisCSSFile)
        {
            $cssPath = [io.path]::combine($global:projectFolder,$thisCSSFile) 
            $page = Get-Content -Path ($cssPath) -Raw 
            $response.Headers.Add("Content-Type","text/css") 
        }
        elseif ($thisGETAPI) 
        {   
            $args = "";  
            for ($i=1; $i -le $paramCount; $i++)
                {
                  $args = $args + " " + $request.Url.Segments[$i + 2]
                } 
            if($args -ne "") { $args = ' ' + $args } # addign a space seperator before callign the arguements
            $page = &($thisGETAPI + $args)
            $response.Headers.Add("Content-Type","application/json")
        }
        else
        {
        $page = " incorrect URL"
        $response.Headers.Add("Content-Type","text/html")     
        }

        $buffer = [System.Text.Encoding]::UTF8.GetBytes($page)
        $response.ContentLength64 = $buffer.Length
        $response.OutputStream.Write($buffer,0,$buffer.Length)
        $response.Close()
        "Response sent to browser"
    }

} 
finally {
    $listener.Stop()
    $listener.Close()
}
