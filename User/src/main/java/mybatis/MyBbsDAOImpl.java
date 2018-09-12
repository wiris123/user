package mybatis;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Param;

public interface MyBbsDAOImpl 
{
	//리스트출력 리스트
	public ArrayList<BoardVO> list();
	
	//1. 게시물수 카운트
	public int getTotalCount(String b_id);
	
	//2.start,end 값을 받아서 select하기
	public ArrayList<BoardVO> listPage (String b_id, int start, int end);
	
	//3.1:1상담페이지를 위한 select
	public ArrayList<BoardCommVO> listresPage (String b_id, int start, int end);
	
	//4.View 딴 가져오기(내용가져오기)
	public BoardVO listView (String num);
	//public void write( String name,  String contents,  String id);
/*	public void write(@Param("_name") String name, @Param("_contents") String contents, @Param("_id") String id);
	
	public BoardDTO view(String idx, String id);
	
	public int modify( String name,  String contents,  String id,  String idx);
	
	public int delete(String idx, String id);
	
	//방명록 게시판 페이지 처리
	*/
		
		
}
