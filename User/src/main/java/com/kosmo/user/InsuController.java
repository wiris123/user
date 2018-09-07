package com.kosmo.user;

import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

/**
 * Handles requests for the application home page.
 */
@Controller
public class InsuController 
{
	
	private static final Logger logger = LoggerFactory.getLogger(InsuController.class);
	@Autowired
	private SqlSession sqlSession;
	//로그인처리

	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		
		String formattedDate = dateFormat.format(date);
		
		model.addAttribute("serverTime", formattedDate );
		
		return "home";
	}
	
	@RequestMapping("/product/Cancer")
	public String ds() {
		
		
		return "product/Cancer";
	}


	@RequestMapping("/product/insert_term.do")
	public String insertMemTerm() 
	{
		
		
		return "product/pro_member_term";
	}

	
	@RequestMapping("/product/insuTermAction.do	")
	public String insTermAction(HttpServletRequest req, ModelAndView mv) 
	{
		
		String mobile = (req.getParameter("mobile1")+"-"+req.getParameter("mobile2")+"-"+req.getParameter("mobile3"));
		
		
		
		return "product/pro_member_term";
	}
	
}
