package com.kosmo.user;

import java.text.DateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.catalina.mapper.Mapper;
import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import dto.TermMemDTO;
import interfaceLoader.MyInsuImpl;


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

	@RequestMapping("/product/pro_success.do")
	public String sucJoin()
	{
		
		return "/product/pro_success";
	}

	@RequestMapping("/product/insert_term.do")
	public ModelAndView insertMemTerm(HttpServletRequest req) 
	{
		Map<String, Object> map = new HashMap<String, Object>(); 
		ModelAndView mv = new ModelAndView();
		String birth = req.getParameter("gobirth");
		String instime = req.getParameter("goinstime");
		String paytime = req.getParameter("gopaytime");
		String death = req.getParameter("death");
		String prem = req.getParameter("gopayprem");
		map.put("birth", birth);
		map.put("instime", instime);
		map.put("paytime", paytime);
		map.put("death", death);
		map.put("prem", prem);
		
		//map to json을 위한 로직 + 매퍼 포함
		String jsonMap ="";
		ObjectMapper mapper = new ObjectMapper();	
		try
		{
			jsonMap = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(map).replaceAll("\r\n|| ","");
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		
		mv.addObject("basicInfo", jsonMap);
		System.out.println(map);
		mv.setViewName("/product/pro_member_term");
		return mv;
	}


	@RequestMapping("/product/insuTermAction.do")
	public ModelAndView insuTermAction(HttpServletRequest req) 
	{	
		
		ModelAndView mv = new ModelAndView();
		
		//member_term 테이블에 입력하기 
		String id = req.getParameter("id");
		String name = req.getParameter("name");
		String pass = req.getParameter("pass");
		String phone = (req.getParameter("phone1")+"-"+req.getParameter("phone2")+"-"+req.getParameter("phone3"));
		String mobile = (req.getParameter("mobile1")+"-"+req.getParameter("mobile2")+"-"+req.getParameter("mobile3"));
		String email = req.getParameter("email1")+"@"+req.getParameter("email2");
		String drive = req.getParameter("drive");
		String cigar = req.getParameter("cigar");
		String drink = req.getParameter("drink");
		String height = req.getParameter("height");
		String weight = req.getParameter("weight");
		String danhobby = req.getParameter("danhobby");
		String income = req.getParameter("income");
		String hospit1 = req.getParameter("hospit1");
		String hospit2 = req.getParameter("hospit2");
		String hospit3 = req.getParameter("hospit3");
		String userInfo = req.getParameter("userInfo");
		String ins_name = req.getParameter("ins_name");


		sqlSession.getMapper(MyInsuImpl.class).insertMemberTerm(id,  pass,  name,  phone,  mobile,  email,  drive,
				cigar,  drink,  height,  weight,  danhobby,  income,  hospit1,
				 hospit2,  hospit3,  "0",  "2", ins_name);
	
		//입력완료
		
		//member_term_my 테이블에 입력하기
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> map = new HashMap<String, Object>();

		try
		{
			map = mapper.readValue(userInfo, new TypeReference<Map<String, Object>>(){});
		}
		catch (Exception e) 
		{
			e.printStackTrace();
		}
		
		//json 처리 완료
		String ctm = String.valueOf(System.currentTimeMillis());
		String remainpay = "0";
		String paidprem = "0";
		sqlSession.getMapper(MyInsuImpl.class).insertStatusTerm(id, ins_name, ctm, remainpay, paidprem, map.get("prem").toString(), "E");
		

		mv.addObject("ins_num", ctm);
		mv.addObject("ins_name",ins_name);
		mv.addObject("name",name);
		mv.setViewName("/product/pro_success");
		
		return mv;
	}
	
	
	
}
