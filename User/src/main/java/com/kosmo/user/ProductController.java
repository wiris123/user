package com.kosmo.user;

import org.apache.ibatis.session.SqlSession;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ProductController 
{
	//마이바티스 이용을 위한 sqlsession
	SqlSession sqlSession;
	
	//JDBC 템플릿
	JdbcTemplate template;
	
	@RequestMapping("/product/pro_annual")
	public String pro_annual() 
	{
		
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
