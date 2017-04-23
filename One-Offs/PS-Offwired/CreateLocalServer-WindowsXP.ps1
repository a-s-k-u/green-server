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
$global:projectFolder = 'C:\Users\arun-\Documents\GitHub\green-server\One-Offs\PS-Offwired\Offwired'
#$global:projectFolder = $args[0]
$global:mainFolder = 'C:\Users\arun-\Documents\GitHub\green-server\One-Offs\PS-Offwired'
'args - 0 is ' + $args[0]
#----------------------------------------------------------------
"Including PS Script"
$scriptPath = 'C:\Users\arun-\Documents\GitHub\green-server\One-Offs\PS-Offwired\Offwired.ps1'
. $scriptPath
#----------------------------------------------------------------

$global:status = 'Not Started'

#----------------------------------------------------------------


<#

$TimerHDD.Interval =  10000  # (5 min)
$TimerHDD.add_Tick({checkListener})
$TimerHDD.start()
#>
#----------------------------------------------------------------
$ScriptBlock = {
    [void] [System.Reflection.Assembly]::LoadWithPartialName("System.Windows.Forms")
$form1 = New-Object System.Windows.Forms.form
$NotifyIcon= New-Object System.Windows.Forms.NotifyIcon
$ContextMenu = New-Object System.Windows.Forms.ContextMenu
$MenuItem = New-Object System.Windows.Forms.MenuItem
$TimerHDD = New-Object System.Windows.Forms.Timer
$icoPath = [io.path]::combine($global:mainFolder,'Data\a.ico');

$form1.ShowInTaskbar = $false
$form1.WindowState = "minimized"

$iconOK = New-Object System.Drawing.Icon($icoPath)
$NotifyIcon.Icon =  $iconOK
$NotifyIcon.Text = "Offwired Team Portal"
$NotifyIcon.ContextMenu = $ContextMenu
$MenuItem.Text = "Exit"
$MenuItem.add_Click({
   $NotifyIcon.Visible = $False
   $form1.close()
   Invoke-WebRequest -Uri http://localhost:8082/CloseSession -Method POST
   #exit;
})
$NotifyIcon.contextMenu.MenuItems.AddRange($MenuItem)
$NotifyIcon.Visible = $True
[void][System.Windows.Forms.Application]::Run($form1)
  }
#----------------------------------------------------------------

Start-Job $ScriptBlock

<#
function checkListener(){
     'Timer event called'
     if ($global:status -eq 'Running'){
          #do nothing
     }else{
          openListener ;
     }
   
}#>

function Escape-JSONString($str){
	if ($str -eq $null) {return ""}
	$str = $str.ToString().Replace('"','\"').Replace('\','\\').Replace("`n",'\n').Replace("`r",'\r').Replace("`t",'\t')
	return $str;
}

function ConvertTo-JSON($maxDepth = 4,$forceArray = $false) {
	begin {
		$data = @()
	}
	process{
		$data += $_
	}
	
	end{
	
		if ($data.length -eq 1 -and $forceArray -eq $false) {
			$value = $data[0]
		} else {	
			$value = $data
		}

		if ($value -eq $null) {
			return "null"
		}

		

		$dataType = $value.GetType().Name
		
		switch -regex ($dataType) {
	            'String'  {
					return  "`"{0}`"" -f (Escape-JSONString $value )
				}
	            '(System\.)?DateTime'  {return  "`"{0:yyyy-MM-dd}T{0:HH:mm:ss}`"" -f $value}
	            'Int32|Double' {return  "$value"}
				'Boolean' {return  "$value".ToLower()}
	            '(System\.)?Object\[\]' { # array
					
					if ($maxDepth -le 0){return "`"$value`""}
					
					$jsonResult = ''
					foreach($elem in $value){
						#if ($elem -eq $null) {continue}
						if ($jsonResult.Length -gt 0) {$jsonResult +=', '}				
						$jsonResult += ($elem | ConvertTo-JSON -maxDepth ($maxDepth -1))
					}
					return "[" + $jsonResult + "]"
	            }
				'(System\.)?Hashtable' { # hashtable
					$jsonResult = ''
					foreach($key in $value.Keys){
						if ($jsonResult.Length -gt 0) {$jsonResult +=', '}
						$jsonResult += 
@"
	"{0}": {1}
"@ -f $key , ($value[$key] | ConvertTo-JSON -maxDepth ($maxDepth -1) )
					}
					return "{" + $jsonResult + "}"
				}
	            default { #object
					if ($maxDepth -le 0){return  "`"{0}`"" -f (Escape-JSONString $value)}
					
					return "{" +
						(($value | Get-Member -MemberType *property | % { 
@"
	"{0}": {1}
"@ -f $_.Name , ($value.($_.Name) | ConvertTo-JSON -maxDepth ($maxDepth -1) )			
					
					}) -join ', ') + "}"
	    		}
		}
	}
}
	
	
#"a" | ConvertTo-JSON
#dir \ | ConvertTo-JSON 
#(get-date) | ConvertTo-JSON
#(dir \)[0] | ConvertTo-JSON -maxDepth 1
#@{ "asd" = "sdfads" ; "a" = 2 } | ConvertTo-JSON

function openListener($something){
     try{
            
             $listener = New-Object Net.HttpListener
             $listener.Prefixes.Add("http://localhost:8082/")
             "Starting the local server at port 8081"
             $listener.Start()
            "Local server started and server listening to port 8081"

            "Opening the browser"
             Start-Process -FilePath "http://localhost:8082/index.html"
            "Browser Opened with the url to local server"

             $global:status = 'Running'

             While ($listener.IsListening){
                $context = $listener.GetContext()
                $request = $context.Request
                $response = $context.Response
                "Debug: Raw URL " + $request.RawUrl
                if ($request.RawUrl -eq '/'){
                   continue;
                }
                <#
                $scriptpath = $MyInvocation.MyCommand.Path
                $dir = Split-Path $scriptpath
                Write-host "My directory is $dir"
                #>

                if ($request.RawUrl -Match ".html"){
                    $pagePath = [io.path]::combine($global:projectFolder,$request.RawUrl.TrimStart("/")) 
                    $page = [IO.File]::ReadAllText($pagePath)
                    $response.Headers.Add("Content-Type","text/html")
                }
                elseif($request.RawUrl -Match ".js"){
                    $jsPath = [io.path]::combine($global:projectFolder,$request.RawUrl.TrimStart("/")) 
                    $page = [IO.File]::ReadAllText($jsPath)
                    $response.Headers.Add("Content-Type","application/javascript") 
                }
                elseif($request.RawUrl -Match ".css"){
                    $cssPath = [io.path]::combine($global:projectFolder,$request.RawUrl.TrimStart("/")) 
                    $page = [IO.File]::ReadAllText($cssPath)
                    $response.Headers.Add("Content-Type","text/css") 
                }
                elseif($request.RawUrl -Match ".ico"){
                    $page = ''
                    $response.Headers.Add("Content-Type","text/html")
                }
                elseif($request.RawUrl -Match ".png"){
                    $pngPath = [io.path]::combine($global:mainFolder,$request.RawUrl.TrimStart("/"))
                    #$page = [convert]::ToBase64String((get-content $pngPath -encoding byte))
                    $response.Headers.Add("Content-Type","image/png")
                    $buffer = (get-content $pngPath -encoding byte)
                    $response.ContentLength64 = $buffer.Length
                    $response.OutputStream.Write($buffer,0,$buffer.Length)
                    $response.Close()
                    continue;
                }
                elseif($request.RawUrl -Match ".woff"){
                    $pngPath = [io.path]::combine($global:projectFolder,$request.RawUrl.TrimStart("/"))
                    #$page = [convert]::ToBase64String((get-content $pngPath -encoding byte))
                    $response.Headers.Add("Content-Type","application/x-font-woff")
                    $buffer = (get-content $pngPath -encoding byte)
                    $response.ContentLength64 = $buffer.Length
                    $response.OutputStream.Write($buffer,0,$buffer.Length)
                    $response.Close()
                    continue;
                }
                 elseif($request.RawUrl -Match ".woff2"){
                    $pngPath = [io.path]::combine($global:projectFolder,$request.RawUrl.TrimStart("/"))
                    #$page = [convert]::ToBase64String((get-content $pngPath -encoding byte))
                    $response.Headers.Add("Content-Type","application/x-font-woff")
                    $buffer = (get-content $pngPath -encoding byte)
                    $response.ContentLength64 = $buffer.Length
                    $response.OutputStream.Write($buffer,0,$buffer.Length)
                    $response.Close()
                    continue;
                }
                elseif($request.RawUrl -Match ".ttf"){
                    $pngPath = [io.path]::combine($global:projectFolder,$request.RawUrl.TrimStart("/"))
                    #$page = [convert]::ToBase64String((get-content $pngPath -encoding byte))
                    $response.Headers.Add("Content-Type","application/octet-stream")
                    $buffer = (get-content $pngPath -encoding byte)
                    $response.ContentLength64 = $buffer.Length
                    $response.OutputStream.Write($buffer,0,$buffer.Length)
                    $response.Close()
                    continue;
                }
                elseif($request.HttpMethod.ToUpper() -eq 'GET'){
                    $paramCount =  $request.Url.Segments.Count - 2
                    Write-Host $request.Url.Segments;
                    $args = "";  
                    for ($i=1; $i -le $paramCount; $i++)
                        {
                          $args = $args + " " + $request.Url.Segments[$i + 1].TrimEnd('/')
                        } 
                    #if($args -ne "") { $args = ' ' + $args } # adding a space seperator before calling the arguements


                    $methodName = $request.HttpMethod + $request.Url.Segments[1].TrimEnd('/')
                    $JSON = $args
                    $exp = $methodName + ' $JSON'
                    try{
                        $page = Invoke-Expression $exp
                        $response.Headers.Add("Content-Type","application/json")
                    }catch{
                        Write-Host $_.Exception.Message
                        $pagePath = [io.path]::combine($global:projectFolder,'index.html') 
                        $page = [IO.File]::ReadAllText($pagePath)
                        $response.Headers.Add("Content-Type","text/html")
                    }
                    #$page = &($methodName + $args)
                }
                elseif($request.HttpMethod.ToUpper() -eq 'POST'){
                     $StreamReader = New-Object System.IO.StreamReader $request.InputStream
                     $StreamData = $StreamReader.ReadToEnd()
                     $JSON = $StreamData | ConvertFrom-Json
                     $methodName = $request.HttpMethod + $request.Url.Segments[1]
                     $exp = $methodName + ' $JSON'
                     $page = Invoke-Expression $exp
                     $response.Headers.Add("Content-Type","application/json")

                }
                elseif($request.HttpMethod.ToUpper() -eq 'PUT'){
                     $StreamReader = New-Object System.IO.StreamReader $request.InputStream
                     $StreamData = $StreamReader.ReadToEnd()
                     $JSON = $StreamData | ConvertFrom-Json
                     $methodName = $request.HttpMethod + $request.Url.Segments[1]
                     $exp = $methodName + ' $JSON'
                     $page = Invoke-Expression $exp
                     $response.Headers.Add("Content-Type","application/json")

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
            'BELOW EXCEPTION THROWN'
            Write-Host $_.Exception.Message
            Write-Host "Press any key to continue ..."
            $x = $host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
           
        }
        finally{
            $listener.Stop()
            $listener.Close()
        }
}

openListener ;

<#
[void][System.Windows.Forms.Application]::Run($form1)
[void] $form1.ShowDialog() 

$form1.Add_Shown({openListener ;})
$form1.ShowDialog()
#>

