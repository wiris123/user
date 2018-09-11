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
		String mode = req.getParameter("mode");
		
		map.put("birth", birth);
		map.put("instime", Integer.parseInt(instime)*12);
		map.put("paytime", Integer.parseInt(paytime)*12);
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
				 hospit2,  hospit3,  "2", ins_name);
	
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
		
		//마이페이지에서 조회할 수 있는 MyStatus
		String ctm = String.valueOf(System.currentTimeMillis());
		String remainpay = map.get("paytime").toString();
		String paidprem = "0";
		sqlSession.getMapper(MyInsuImpl.class).insertStatusTerm(id, ins_name, ctm, remainpay, paidprem, map.get("prem").toString(), "E",map.get("death").toString());
		

		mv.addObject("ins_num", ctm);
		mv.addObject("ins_name",ins_name);
		mv.addObject("name",name);
		mv.setViewName("/product/pro_success");
		
		return mv;
	}
	
	@RequestMapping("/product/prop_cal")
	public ModelAndView insertMemProp(HttpServletRequest req) 
	{
		Map<String, Object> map = new HashMap<String, Object>(); 
		ModelAndView mv = new ModelAndView();
		
		int hosp = Integer.parseInt(req.getParameter("hosp"));
		int gohosp = Integer.parseInt(req.getParameter("gohosp"));
		int sanghosp = Integer.parseInt(req.getParameter("sanghosp"));
		int sgohosp = Integer.parseInt(req.getParameter("sgohosp"));
		int chbedosu = Integer.parseInt(req.getParameter("chbedosu"));
		int chbeinje = Integer.parseInt(req.getParameter("chbeinje"));
		int chbemri = Integer.parseInt(req.getParameter("chbemri"));
		String mode = req.getParameter("mode");
		String payment = req.getParameter("payment");
		
		map.put("hosp", hosp);
		map.put("gohosp", gohosp);
		map.put("sanghosp", sanghosp);
		map.put("sgohosp", sgohosp);
		map.put("chbedosu", chbedosu);
		map.put("chbeinje", chbeinje);
		map.put("chbemri", chbemri);
		map.put("payment", payment);
		
		//map to json을 위한 로직 + 매퍼 포함
		String jsonMap ="";
		ObjectMapper mapper = new ObjectMapper();	
		
		try
		{
			jsonMap = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(map).replaceAll("\r\n|| ","");
		}
		catch (Exception e) 
		{
			e.printStackTrace();
		}
		
		mv.addObject("basicInfo", jsonMap);
		mv.addObject("mode", mode);
		
		mv.setViewName("/product/pro_member_term");
		return mv;
	}
	
	
	@RequestMapping("/product/insuPropAction.do")
	public ModelAndView insuPropAction(HttpServletRequest req) 
	{	
		
		ModelAndView mv = new ModelAndView();
		
		//member_term 테이블에 입력하기 
		String id = req.getParameter("id");
		String name = req.getParameter("name");
		String pass = req.getParameter("pass");
		String phone = (req.getParameter("phone1")+"-"+req.getParameter("phone2")+"-"+req.getParameter("phone3"));
		String mobile = (req.getParameter("mobile1")+"-"+req.getParameter("mobile2")+"-"+req.getParameter("mobile3"));
		String email = req.getParameter("email1")+"@"+req.getParameter("email2");
		int drive = Integer.parseInt(req.getParameter("drive"));
		int cigar = Integer.parseInt(req.getParameter("cigar"));
		int drink = Integer.parseInt(req.getParameter("drink"));
		int height = Integer.parseInt(req.getParameter("height"));
		int weight = Integer.parseInt(req.getParameter("weight"));
		String danhobby = req.getParameter("danhobby");
		int income = Integer.parseInt(req.getParameter("income"));
		int hospit1 = Integer.parseInt(req.getParameter("hospit1"));
		int hospit2 = Integer.parseInt(req.getParameter("hospit2"));
		int hospit3 = Integer.parseInt(req.getParameter("hospit3"));
		String userInfo = req.getParameter("userInfo");
		String ins_name = req.getParameter("ins_name");

		//위험률을 계산하여 저장
		int riskPremium =   drive+ cigar+  drink+  height+  weight+ income+  hospit1+ hospit2+  hospit3;
		
		// 
		sqlSession.getMapper(MyInsuImpl.class).insertMemberProp(id,  pass,  name,  phone,  mobile,  email, riskPremium,  "0",  "3", ins_name);
	
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
		
		//마이페이지에서 조회할 수 있는 MyStatus
		String ctm = String.valueOf(System.currentTimeMillis());
		int remainpay = Integer.parseInt(map.get("payment").toString())*12;
		String paidprem = "0";
		sqlSession.getMapper(MyInsuImpl.class).insertStatusProp(id, ins_name, ctm, String.valueOf(remainpay), paidprem, map.get("payment").toString(), "E");
		

		mv.addObject("ins_num", ctm);
		mv.addObject("ins_name",ins_name);
		mv.addObject("name",name);
		mv.setViewName("/product/pro_success");
		
		return mv;
	}
	
	@RequestMapping("/product/annu_cal.do")
	public ModelAndView insertMemAnnu(HttpServletRequest req) 
	{
		Map<String, Object> map = new HashMap<String, Object>(); 
		ModelAndView mv = new ModelAndView();
		//
		String birth = req.getParameter("gobirth");
		String monthann = req.getParameter("gomonthann");
		String bonus = req.getParameter("gobonus");
		String payment = req.getParameter("payment");
		String instart = req.getParameter("instart");
		String paytime = req.getParameter("paytime");
	
		
		
		map.put("birth", birth);
		map.put("monthann", monthann);
		map.put("bonus", bonus);
		map.put("payment", payment);
		map.put("instart", instart);
		map.put("paytime", paytime);
		
		
		
		//map to json을 위한 로직 + 매퍼 포함
		String jsonMap ="";
		ObjectMapper mapper = new ObjectMapper();	
		
		try
		{
			jsonMap = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(map).replaceAll("\r\n|| ","");
		}
		catch (Exception e) 
		{
			e.printStackTrace();
		}
		
		mv.addObject("basicInfo", jsonMap);
		
		mv.setViewName("/product/pro_member_annu");
		return mv;
	}
	
	
	@RequestMapping("/product/insuAnnuAction.do")
	public ModelAndView insuAnnuAction(HttpServletRequest req) 
	{	
		
		ModelAndView mv = new ModelAndView();
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> map = new HashMap<String, Object>();
		String userInfo = req.getParameter("userInfo");
		try
		{
			map = mapper.readValue(userInfo, new TypeReference<Map<String, Object>>(){});
		}
		catch (Exception e) 
		{
			e.printStackTrace();
		}
		//member_annu 테이블에 입력하기 
		String id = req.getParameter("id");
		String name = req.getParameter("name");
		String phone =  (req.getParameter("phone1")+"-"+req.getParameter("phone2")+"-"+req.getParameter("phone3"));
		String mobile = (req.getParameter("mobile1")+"-"+req.getParameter("mobile2")+"-"+req.getParameter("mobile3"));
		String insnum = req.getParameter("insnum");
		String email = req.getParameter("email1")+"@"+req.getParameter("email2");
		String prem = req.getParameter("prem");
		String monthann = map.get("paytime").toString();
		String contstat = req.getParameter("contstat");
		int drive = Integer.parseInt(req.getParameter("drive"));
		int cigar = Integer.parseInt(req.getParameter("cigar"));
		int hospit1 = Integer.parseInt(req.getParameter("hospit1"));
		int hospit2 = Integer.parseInt(req.getParameter("hospit2"));
		int hospit3 = Integer.parseInt(req.getParameter("hospit3"));
		String ins_name = req.getParameter("ins_name");
		int remainpay = Integer.parseInt(map.get("paytime").toString())*12;
		String paidprem = "0";

		//위험률을 계산하여 저장
		int riskPremium =   drive+ cigar+ hospit1+ hospit2+  hospit3;
		
		// 
		sqlSession.getMapper(MyInsuImpl.class).insertMemberAnnu(name,phone,	mobile,	email,	String.valueOf(drive),	String.valueOf(cigar),	String.valueOf(hospit1),
				String.valueOf(hospit2),"3",ins_name,monthann,String.valueOf(riskPremium));
	
		
		
		//입력완료
		
		//member_term_my 테이블에 입력하기
		
		
		//json 처리 완료
		
		//마이페이지에서 조회할 수 있는 MyStatus
		String ctm = String.valueOf(System.currentTimeMillis());
		
		sqlSession.getMapper(MyInsuImpl.class).insertStatusAnnu(id, ins_name, ctm, String.valueOf(remainpay), paidprem, monthann, map.get("instart").toString(), "E", String.valueOf(remainpay));
		

		mv.addObject("ins_num", ctm);
		mv.addObject("ins_name",ins_name);
		mv.addObject("name", name);
		mv.setViewName("/product/pro_success");
		
		return mv;
	}
	
	
	
	
	
}
