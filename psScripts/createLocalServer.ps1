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
"Including PS Script"
$scriptPath = [io.path]::combine($global:projectFolder,'PSScript.ps1')
. $scriptPath
#----------------------------------------------------------------

$listener = New-Object Net.HttpListener
$listener.Prefixes.Add("http://localhost:8081/")
"Starting the local server at port 8081"
$listener.Start()
"Local server started and server listening to port 8081"

"Opening the browser"
Start-Process -FilePath "http://localhost:8081/index.html"
"Browser Opened with the url to local server"

try{

    While ($listener.IsListening){
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        "Debug: Raw URL " + $request.RawUrl

        <#
        $scriptpath = $MyInvocation.MyCommand.Path
        $dir = Split-Path $scriptpath
        Write-host "My directory is $dir"
        #>

        if ($request.RawUrl -Match ".html"){
            $pagePath = [io.path]::combine($global:projectFolder,$request.RawUrl.TrimStart("/")) 
            $page = Get-Content -Path ($pagePath) -Raw
            $response.Headers.Add("Content-Type","text/html")
        }
        elseif($request.RawUrl -Match ".js"){
            $jsPath = [io.path]::combine($global:projectFolder,$request.RawUrl.TrimStart("/")) 
            $page = Get-Content -Path ($jsPath) -Raw 
            $response.Headers.Add("Content-Type","application/javascript") 
        }
        elseif($request.RawUrl -Match ".css"){
            $cssPath = [io.path]::combine($global:projectFolder,$request.RawUrl.TrimStart("/")) 
            $page = Get-Content -Path ($cssPath) -Raw 
            $response.Headers.Add("Content-Type","text/css") 
        }
        elseif($request.HttpMethod.ToUpper() = 'GET'){
            $paramCount =  $request.Url.Segments.Count - 2

            $args = "";  
            for ($i=1; $i -le $paramCount; $i++)
                {
                  $args = $args + " " + $request.Url.Segments[$i + 2]
                } 
            if($args -ne "") { $args = ' ' + $args } # addign a space seperator before callign the arguements


            $methodName = $request.HttpMethod + $request.Url.Segments[1]
            $page = &($methodName + $args)
            $response.Headers.Add("Content-Type","application/json")
        }
        elseif($request.HttpMethod.ToUpper() = 'POST'){
         'POST METHOD ENCOUNTERED'
        }
        else{
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
catch{
'SOME EXCEPTION THROWN'
}
finally{
    $listener.Stop()
    $listener.Close()
}
