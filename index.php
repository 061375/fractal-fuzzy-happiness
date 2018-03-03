<?php
        $dev = isset($_GET["dev"]) ? strtotime("now") : false;
    ?><!DOCTYPE html>
    <html>
        <head>
            <title>Accidental Fractal Animation Javascript</title>
            <link href="css/style.css?<?php echo $dev; ?>" rel="stylesheet" />
        </head>
        <body>
            <div id="target"></div>
            <script src="js/wes.mantooth.js?<?php echo $dev; ?>"></script>
            <?php
                loadsscripts("js/");
                function loadsscripts($dir) {
                    global $dev;
                    // load files
                    $files = scandir($dir);
                    foreach($files as $file) {
                        if($file == "wes.mantooth.js" || (strpos($file,".js") === false)) {continue;}
                        echo '<script src="'.$dir.$file.'?'.$dev.'&v=1.1.2"></script>'."\n";
                    }   
                }
            ?>
        </body>
    </html>