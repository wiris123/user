package com.kosmo.user;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class EventController {

/*	@RequestMapping("/event/bbs_event")
	public String bbs_event() {
		
		
		return "event/bbs_event";
	}
	
	@RequestMapping("/event/bbs_notice")
	public String bbs_notice() {
		
		
		return "event/bbs_notice";
	}*/
	
	@RequestMapping("/bottommenu/terms")
	public String botm_terms() {
		
		return "bottommenu/terms";
	}
	
	@RequestMapping("/bottommenu/privacy")
	public String botm_privacy() {
		
		return "bottommenu/privacy";
	}
	
	@RequestMapping("/bottommenu/elecfinance")
	public String botm_elecfinance() {
		
		return "bottommenu/elecfinance";
	}
}
