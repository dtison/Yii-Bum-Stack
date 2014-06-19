<?php

class DashboardController extends Controller
{

    /*
    protected $currentAction;

    protected function beforeAction($action) {
       // $this->currentAction = $action->getId();
    }
*/
    /**
     * Declares class-based actions.
     */
    public function actions()
    {
        return array(
            // captcha action renders the CAPTCHA image displayed on the contact page
            'captcha'=>array(
                'class'=>'CCaptchaAction',
                'backColor'=>0xFFFFFF,
            ),
            // page action renders "static" pages stored under 'protected/views/site/pages'
            // They can be accessed via: index.php?r=site/page&view=FileName
            'page'=>array(
                'class'=>'CViewAction',
            ),
        );
    }
    /*
        public function actionIndex() {

            $this->layout = 'dashboard';
            $this->render('index', array ('action'=>$this->currentAction));

        }

    */


    /**
     * Forces Controller to use backbone.
     */

    public function missingAction() {
        // renders the view file 'protected/views/site/index.php'
        // using the default layout 'protected/views/layouts/main.php'
// Stuff to find the action from the URL, not available in regular Yii functions
        $url = Yii::app()->urlManager->parseUrl(Yii::app()->request);
        $elements = explode('/', $url);
        $action = $elements[count($elements) - 1];

        $this->layout = 'dashboard';
        $this->render('index', array ('action'=>$action));

    }

    /**
     * This is the action to handle external exceptions.
     */
    public function actionError()
    {
        if($error=Yii::app()->errorHandler->error)
        {
            if(Yii::app()->request->isAjaxRequest)
                echo $error['message'];
            else
                $this->render('error', $error);
            $this->layout = 'app';
        }
    }




}