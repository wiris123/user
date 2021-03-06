package com.kosmo.user;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.text.DateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.jsp.JspWriter;

import org.apache.catalina.mapper.Mapper;
import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionException;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import dto.TermMemDTO;
import interfaceLoader.MyInsuImpl;
import interfaceLoader.MyInsuService;


/**
 * Handles requests for the application home page.
 */
@Controller
public class InsuController 
{
	
	private static final Logger logger = LoggerFactory.getLogger(InsuController.class);

	

/*    @Autowired
	PlatformTransactionManager transactionManager;
    DefaultTransactionDefinition def = new DefaultTransactionDefinition();
    
	TransactionStatus status = transactionManager.getTransaction();
	*/
    @Autowired
	private SqlSession sqlSession;
    
    MyInsuService service;
   /* @Autowired
    public void setTransactionManager(PlatformTransactionManager transactionManager) {
		this.transactionManager = transactionManager;
	}
    */

  
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
	public ModelAndView insuTermAction(HttpServletRequest req) throws Exception 
	{	
		
		ModelAndView mv = new ModelAndView();
		
		//member_term 테이블에 입력하기 
		String id = req.getParameter("id");
		String name = req.getParameter("name");
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
		try
		{
			//member_term
			sqlSession.getMapper(MyInsuImpl.class).insertMemberTerm(id,  name,  phone,  mobile,  email,  drive,
					cigar,  drink,  height,  weight,  danhobby,  income,  hospit1,
					 hospit2,  hospit3,  "2", ins_name);
			
			//status
			sqlSession.getMapper(MyInsuImpl.class).insertStatusTerm(id, ins_name, ctm, remainpay, paidprem, map.get("prem").toString(), "E",map.get("death").toString());
			
			
			mv.addObject("ins_num", ctm);
			mv.addObject("ins_name",ins_name);
			mv.addObject("name",name);
			mv.setViewName("/product/pro_success");
			
			return mv;
		}
		catch (RuntimeException e) 
		{
			e.printStackTrace();
			//transactionManager.rollback(status);
			throw e;
		}
		
		


		
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
		String chbedosu = req.getParameter("chbedosu");
		String chbeinje = req.getParameter("chbeinje");
		String chbemri = req.getParameter("chbemri");
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
	public ModelAndView insuPropAction(HttpServletRequest req,HttpServletResponse resp) throws Exception
	{	
		
		ModelAndView mv = new ModelAndView();
		
		//member_term 테이블에 입력하기 
		String id = req.getParameter("id");
		String name = req.getParameter("name");
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
		int riskPremium =   drive+ cigar+  drink+ income+  hospit1+ hospit2+  hospit3;
		
		
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
		
		try
		{
			//member_prop에 삽입
			sqlSession.getMapper(MyInsuImpl.class).insertMemberProp(id, name,  phone,  mobile,  email, riskPremium, "3", ins_name);
			//member_prop_my에 삽입
			sqlSession.getMapper(MyInsuImpl.class).insertStatusProp(id, ins_name, ctm, String.valueOf(remainpay), paidprem, map.get("paymen3t").toString(), "E"); 
			

			mv.addObject("ins_num", ctm);
			mv.addObject("ins_name",ins_name);
			mv.addObject("name",name);
			mv.setViewName("/product/pro_success");
		/*	transactionManager.commit(status);*/
			
			return mv;
			
		}
		
		catch (RuntimeException e) 
		{

			e.printStackTrace();
			//transactionManager.rollback(status);
			throw e;
		}

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
		int payment = Integer.parseInt(req.getParameter("payment"))*10000;
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
	public ModelAndView insuAnnuAction(HttpServletRequest req) throws Exception 
	{	
		
		ModelAndView mv = new ModelAndView();
		ObjectMapper mapper = new ObjectMapper();
		//json 처리
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
		String monthann = map.get("monthann").toString();
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
		int riskPremium =   drive+ cigar+ hospit1+ hospit2+ hospit3;
		
		// member_annu 삽입(12개)

		
		//입력완료
		
		
		
		//마이페이지에서 조회할 수 있는 MyStatus
		String ctm = String.valueOf(System.currentTimeMillis());
		String payment = map.get("payment").toString();
		int minusPayment = (int)(Integer.parseInt(payment)-Integer.parseInt(payment)*(0.005*riskPremium));
		
		
		try 
		{
			//member
			sqlSession.getMapper(MyInsuImpl.class).insertMemberAnnu
			(id,name,phone,	mobile,	email,	String.valueOf(drive),	String.valueOf(cigar),	String.valueOf(hospit1),
					String.valueOf(hospit2),"3",ins_name,monthann, String.valueOf(riskPremium));
			//status
			sqlSession.getMapper(MyInsuImpl.class).insertStatusAnnu
			(id, ins_name, ctm, String.valueOf(remainpay), paidprem, String.valueOf(minusPayment), monthann, map.get("instart").toString(), "E", String.valueOf(remainpay));
						
			mv.addObject("ins_num", ctm);
			mv.addObject("ins_name",ins_name);
			mv.addObject("name", name);
			mv.setViewName("/product/pro_success");
			
			return mv;
		}
		catch (Exception e)
		{
			e.printStackTrace();
			throw e;
		}


	}
	
	@RequestMapping("/product/pro_status")
	public String editContstat(HttpServletRequest req,HttpServletResponse resp) throws IOException
	{
		ModelAndView mv = new ModelAndView();
		resp.setContentType("text/html; charset=UTF-8");

		String insnum = req.getParameter("insnum"); 
		String mode = req.getParameter("mode");
		String product = req.getParameter("product");
		
		int aff=0;
		if(mode.equals("pause"))
		{
			aff = sqlSession.getMapper(MyInsuImpl.class).updateStatus(insnum,product);
		}
		else if (mode.equals("cancel"))
		{
			aff = sqlSession.getMapper(MyInsuImpl.class).updateStatusDelete(insnum,product);
		}
		
		PrintWriter out = resp.getWriter();
		
/*		out.println("<script>alert('납입중지 신청이 완료되었습니다.'); location.href="/member/mypage.do"</script>");
		out.flush();
		*/
		
		return "redirect:/member/mypage.do";
	}
	
	@RequestMapping("/product/error.do")
	public ModelAndView exceptRun()
	{
		ModelAndView mv = new ModelAndView();
				
		mv.addObject("msg", "입력이 실패");
		mv.addObject("url", "../");
		
		mv.setViewName("../product/pro_success");
		
		return mv;
	}
	
	
	
	
	
}
