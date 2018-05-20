<?php
namespace Passport\Controller;
use Home\Controller\BaseController;
class IndexController extends BaseController
{

	public function __construct()
	{
		parent::__construct();
	}
	
	public function index()
	{
		header("location:".$this->mx_domain['passport']."login");exit;
	}




}
