package com.kosmo.user;

import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.databind.util.JSONPObject;

@Controller
public class JsonController
{
	
	@Autowired
	private SqlSession sqlSession;
	//로그인처리
	
	@RequestMapping("/product/termPrem.do")
	@ResponseBody
	public Map<String, String> termPrem(Model model,HttpServletRequest req) throws ParseException
	{
		int paytime = Integer.parseInt(req.getParameter("paytime"));
		int instime = Integer.parseInt(req.getParameter("instime"));
		int death = Integer.parseInt(req.getParameter("death"));
		int death_hid = Integer.parseInt(req.getParameter("death_hid"));
		String birth = req.getParameter("birth");
		
		int gender1 = Integer.parseInt(req.getParameter("gender1"));
		int gender2 = Integer.parseInt(req.getParameter("gender2"));
		
		int cal_death = 0;
		double result = 0;

		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
		Date begin = new Date();
		Date end = formatter.parse(birth);
		
		long age = (begin.getTime() - end.getTime()) / (24 * 60 * 60 * 1000);
		age = age / 365;
		
		int rprem= 0;
		
		if(gender1==1)
		{
			rprem = 4;
		}
		else
		{
			rprem = 3;
		}
		
		if(instime>=50)
		{
			instime = instime - (int)age;
		}
		
		if(death_hid< death)
		{
			cal_death= death;
		}
		else if(death_hid == death)
		{
			cal_death = 100000000;
		}
		else
		{
			cal_death= death_hid;
		}
			
		// 맞춤설계
		result = cal_death*Math.pow(1.05,instime+paytime)/Math.pow(1.03,instime);
		result = (result/1000+paytime);
		result = result*(1+(rprem*0.01))/12;
		result = (int)Math.round(result);
		
		
		//최저설계
		
		double result0 = 50000000*Math.pow(1.05,instime+paytime)/Math.pow(1.03,instime);
		result0 = (result0/1000+paytime);
		result0 = result0*(1+(rprem*0.01))/12;
		result0 = (int)Math.round(result0);
		
		//추천설계
		double result1 = 150000000*Math.pow(1.05,instime+paytime)/Math.pow(1.03,instime);
		result1 = (result1/1000+paytime);
		result1 = result1*(1+(rprem*0.01))/12;
		result1 = (int)Math.round(result1);
		
		
		DecimalFormat df = new DecimalFormat("#,###");
		
		/*
			연금보험 계산?
					result = death/instime+paytime;
			result = (result* Math.pow(1.03, instime))*(1+(rprem*0.01))/12;
			result = (int)Math.round(result);
		*/
		
		//맵에 추가

		Map<String, String> map = new HashMap<String, String>();
		map.put("mini_result", df.format(result0));
		map.put("custom_result", df.format(result));
		map.put("max_result", df.format(result1));
		
		return map;
	}

	
	@ResponseBody
	public Map<String, Object> annuPrem(Model model,HttpServletRequest req) throws ParseException
	{
		int payment = Integer.parseInt(req.getParameter("payment")); //매월 연금 납입액
		String instart  = req.getParameter("instart"); //연금개시나이
		String paytime = req.getParameter("paytime");
		int rprem = Integer.parseInt(req.getParameter("rprem"));
		int interest =Integer.parseInt(req.getParameter("interest"));
		String birth = req.getParameter("birth"); //생일 8자리값
				
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
		Date begin = new Date();
		Date end = formatter.parse(birth);
		//나이를 구함
		long age = (begin.getTime() - end.getTime()) / (24 * 60 * 60 * 1000);
		age = age / 365;
		
		System.out.println("age"+age);
		//연금개시나이 - 나이 = 연금개시일까지 일수
		int remainDays = Integer.parseInt(instart) - (int)age;
		
		//연금보험 계산
		double result = 0;
		
		result = (payment*10000)* Math.pow(1+(interest*0.01), (int)remainDays) / Math.pow(1+(3*0.01) , (int)remainDays);
		result = result + (result * (interest*0.01*remainDays)) -(result*((rprem*0.01)*remainDays));
		result = (int)Math.round(result);

		
		Map<String, Object> obj = new HashMap<String, Object>();
		obj.put("payt", (int)remainDays);
		obj.put("result", result);

		return obj;
		
	}
}
