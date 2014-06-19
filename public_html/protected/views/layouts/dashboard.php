<?php /* @var $this Controller */ ?>
<!DOCTYPE html >
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="language" content="en" />

    <!-- blueprint CSS framework -->
    <link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" />
    <link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.css" >
    <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/style/bumstack_demo/dashboard.css" />
    <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/style/bumstack_demo/form.css" />

    <title>Example App</title>
</head>

<body>
<div id="loader">
    <div class="modal">
        <h1>Loading...</h1>
        <img src="/img/preloader.gif"/>
        <p>Just a sec..</p>
    </div>
</div>
<div id="modal"></div>
<div class="container" id="page">
    <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">The Example Company</a>
            </div>
            <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav navbar-right" id="mainmenu">
                    <li><a href="/">Website</a></li>
                    <li><a href="/dashboard/settings">Settings</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-3 col-md-2 sidebar" id="sidebar-nav">
            </div>
            <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                <?php echo $content ?>
            </div>
        </div>
    </div>

</div><!-- page -->
<footer id="adminFooter" class="well" style="width:100%; margin:1em 0 0 0;">
    <div style="text-align:center; max-width:600px; margin:0 auto;">
        Samplecompany.com Admin Dashboard
    </div>
    <hr/>
    <div class="row">
        <div style="text-align:center; max-width:600px; margin:0 auto;">
            Copyright &copy; <?php echo date('Y'); ?> Example Company LLC<br/>
            All Rights Reserved.<br/>
        </div>
    </div>
</footer><!-- footer -->
</body>
</html>
