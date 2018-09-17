package com.kosmo.user;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

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
}
