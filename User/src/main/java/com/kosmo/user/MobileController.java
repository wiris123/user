package com.kosmo.user;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import dto.MyStatusDTO;
import interfaceLoader.MobileImpl;
import interfaceLoader.MyInsuImpl;
import mybatis.MemberVO;
import mybatis.MyMemberImpl;

@Controller
public class MobileController 
{

	@Autowired
	SqlSession sqlSession;
	
	
	@RequestMapping("/mobile/test.do")
	public String test()
	{
		
		return "mobile/mobile_test";
	}
	
	
	@RequestMapping("/mobile/memberLogin.do")
	@ResponseBody
	public Map<String, Object> memberLogin(HttpServletRequest req)
	{
		Map<String, Object> memberMap  = new HashMap<String, Object>();
		
		String id = req.getParameter("id");
		String pass = req.getParameter("pass");
		
		
		System.out.println(id+"패스"+pass);
		MemberVO memberVO = sqlSession.getMapper(MobileImpl.class).memberLogin(id, pass);
		
		
		
		
		if(memberVO==null)
		{
			//로그인 실패
			memberMap.put("success", 0);
			System.out.println(" 로그인이 실패다");
		}
		else
		{
			System.out.println(memberVO.getId());
			//로그인 성공
			memberMap.put("success", 1);
			memberMap.put("memberInfo", memberVO);
			
		}		
		
		return memberMap;
		
	}
	
	@RequestMapping("/mobile/memberList.do")
	@ResponseBody
	public ArrayList<MyStatusDTO> memberList(HttpServletRequest req)
	{
		Map<String, Object> memberMap  = new HashMap<String, Object>();
		
		String id = req.getParameter("id");
		
		
		System.out.println(id);
		//연금보험 가입 현황 조회
		ArrayList<MyStatusDTO> lists = sqlSession.getMapper(MyMemberImpl.class).selectMyPageAnnu(id);
		
		
		
		
		if(lists==null)
		{
			//로그인 실패
			memberMap.put("success", 0);
			System.out.println(" 리스트소환 실패다");
		}
		else
		{
			
			//로그인 성공
			memberMap.put("success", 1);		
		}		
		
		return lists;
		
	}
	
	
	@RequestMapping("/mobile/annu_cal.do")
	public ModelAndView insertMemAnnu(HttpServletRequest req) 
	{
		Map<String, Object> map = new HashMap<String, Object>(); 
		ModelAndView mv = new ModelAndView();
		
		String birth = req.getParameter("gobirth");
		String monthann = req.getParameter("gomonthann");
		String bonus = req.getParameter("gobonus");
		int payment = Integer.parseInt(req.getParameter("payment1"))*10000;
		String instart = req.getParameter("instart1");
		String paytime = req.getParameter("paytime1");
	

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
		mv.setViewName("/mobile/pro_member_annu");
		
		
		return mv;
	}
	
	
	@RequestMapping("/mobile/mobile_annu.do")
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
			sqlSession.getMapper(MobileImpl.class).insertMemberAnnuM
			(id,name,phone,	mobile,	email,	String.valueOf(drive),	String.valueOf(cigar),	String.valueOf(hospit1),
					String.valueOf(hospit2),"3",ins_name,monthann, String.valueOf(riskPremium));
			//status
			sqlSession.getMapper(MobileImpl.class).insertStatusAnnuM
			(id, ins_name, ctm, String.valueOf(remainpay), paidprem, String.valueOf(minusPayment), monthann, map.get("instart").toString(), "E", String.valueOf(remainpay));
						
			mv.addObject("ins_num", ctm);
			mv.addObject("ins_name",ins_name);
			mv.addObject("name", name);
			/*mv.setViewName("/product/pro_success");
			*/
			mv.setViewName("/mobile/mobile_end");
			return mv;

		}
		catch (Exception e)
		{
			e.printStackTrace();
			throw e;
		}


	}
	
}
