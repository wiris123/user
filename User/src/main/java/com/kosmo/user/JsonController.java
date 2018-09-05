package com.kosmo.user;

import java.text.DecimalFormat;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class JsonController
{
	
	@Autowired
	private SqlSession sqlSession;
	//로그인처리
	
	@RequestMapping("/product/termPrem.do")
	@ResponseBody
	public String termPrem(Model model,HttpServletRequest req)
	{
		int paytime = Integer.parseInt(req.getParameter("paytime"));
		int instime =Integer.parseInt(req.getParameter("instime"));
		int death = Integer.parseInt(req.getParameter("death"));
		int death_hid = Integer.parseInt(req.getParameter("death_hid"));
		int birth = Integer.parseInt(req.getParameter("birth"));
		
		int cal_death = 0;
		double result = 0;
		int age = 20180905 - birth;
		
		int rprem = 3;
		
		if(paytime>=40)
		{
			paytime = paytime - age;
		}
		
		if(instime>=40)
		{
			paytime = instime - age;
		}
		
		if(death_hid!= death)
		{
			cal_death= death;
		}
		
		result = cal_death*Math.pow(1.05,paytime)/Math.pow(1.03,instime-paytime);
		result = (result/100);
		result = result*(1+(rprem*0.01))/12;
		result = (int)Math.round(result);
		
		DecimalFormat df = new DecimalFormat("#,###");
		/*
			연금보험 계산?
					result = death/instime+paytime;
			result = (result* Math.pow(1.03, instime))*(1+(rprem*0.01))/12;
			result = (int)Math.round(result);
		*/
		String resultStr = "월</span>"+df.format(result)+"<span>";
		System.out.println(result);
		return resultStr;
	}

}
