package com.kosmo.user;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class ApiController 
{


	@RequestMapping("/custom/chat")
	public String myWebChat(Model model) 
	{
		
		return "/custom/chat";	
	}
}
