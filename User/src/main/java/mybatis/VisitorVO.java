package mybatis;

import java.sql.Date;

public class VisitorVO {
	private int visitor_idx;
	private String visit_ip;
	private Date date;
	private String visit_from;
	
	//생성자
	public VisitorVO() {}
	public VisitorVO(int visitor_idx, String visit_ip, Date date, String visit_from) {
		this.visitor_idx = visitor_idx;
		this.visit_ip = visit_ip;
		this.date = date;
		this.visit_from = visit_from;
	}
	//게터세터
	public int getVisitor_idx() {
		return visitor_idx;
	}
	public void setVisitor_idx(int visitor_idx) {
		this.visitor_idx = visitor_idx;
	}
	public String getVisit_ip() {
		return visit_ip;
	}
	public void setVisit_ip(String visit_ip) {
		this.visit_ip = visit_ip;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public String getVisit_from() {
		return visit_from;
	}
	public void setVisit_from(String visit_from) {
		this.visit_from = visit_from;
	}
	
	
}
