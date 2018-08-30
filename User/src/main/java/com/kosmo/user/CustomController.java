package com.kosmo.user;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CustomController {
	
	@RequestMapping("/custom/cus_faq")
	public String cus_faq() {
		
		
		return "custom/cus_faq";
	}
	
	@RequestMapping("/custom/cus_qna")
	public String cus_qna() {
		
		
		return "custom/cus_qna";
	}
	
}
