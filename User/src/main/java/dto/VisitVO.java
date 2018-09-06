package dto;

public class VisitVO {
	private int visit_idx;// 인덱스
	private int visit_ip;// 방문자아이피
	private int visit_date;// 방문일
	private int visit_from;// 방문경로
	
	//생성자
	public VisitVO() {
	}
	public VisitVO(int visit_idx, int visit_ip, int visit_date, int visit_from) {
		this.visit_idx = visit_idx;
		this.visit_ip = visit_ip;
		this.visit_date = visit_date;
		this.visit_from = visit_from;
	}
	
	//게터/세터
	public int getVisit_idx() {
		return visit_idx;
	}

	public void setVisit_idx(int visit_idx) {
		this.visit_idx = visit_idx;
	}

	public int getVisit_ip() {
		return visit_ip;
	}

	public void setVisit_ip(int visit_ip) {
		this.visit_ip = visit_ip;
	}

	public int getVisit_date() {
		return visit_date;
	}

	public void setVisit_date(int visit_date) {
		this.visit_date = visit_date;
	}

	public int getVisit_from() {
		return visit_from;
	}

	public void setVisit_from(int visit_from) {
		this.visit_from = visit_from;
	}

}
