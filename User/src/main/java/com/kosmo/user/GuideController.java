package com.kosmo.user;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class GuideController {

	@RequestMapping("/guide/gde_before")
	public String gde_before(){
		
		return "guide/gde_before";
	}
	
	@RequestMapping("/guide/gde_after")
	public String gde_after(){
		
		return "guide/gde_after";
	}
	
	@RequestMapping("/guide/gde_annual")
	public String gde_annual(){
		
		return "guide/gde_annual";
	}
	
	
}
