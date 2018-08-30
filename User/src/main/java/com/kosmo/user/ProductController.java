package com.kosmo.user;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ProductController {

	@RequestMapping("/product/pro_annual")
	public String pro_annual() {
		return "product/pro_annual";
	}
	
	@RequestMapping("/product/pro_prop")
	public String pro_prop() {
		return "product/pro_prop";
	}
	
	@RequestMapping("/product/pro_term")
	public String pro_term() {
		return "product/pro_term";
	}
}
