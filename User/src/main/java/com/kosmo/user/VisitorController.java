package com.kosmo.user;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;


public class VisitorController implements HttpSessionListener
{
	@Autowired
	private SqlSession sqlSession;
	
    @Override
    public void sessionCreated(HttpSessionEvent sessionEve) {
        
        // 세션이 새로 생성되면 execute() 실행한다.
        if(sessionEve.getSession().isNew()){
            execute(sessionEve);
        }
    }
 
    private void execute(HttpSessionEvent sessionEve) 
    {

    }
 
    @Override
    public void sessionDestroyed(HttpSessionEvent arg0) {}
 
}