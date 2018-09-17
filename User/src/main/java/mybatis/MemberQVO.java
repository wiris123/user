package mybatis;

import java.sql.Date;

public class MemberQVO {
	private String idx;
	private String name;
	private String id;
	private String prmobile;
	private Date regidate;
	private String contents;
	private String event;
	public MemberQVO() {}
	public String getIdx() {
		return idx;
	}
	public void setIdx(String idx) {
		this.idx = idx;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPrmobile() {
		return prmobile;
	}
	public void setPrmobile(String prmobile) {
		this.prmobile = prmobile;
	}
	public Date getRegidate() {
		return regidate;
	}
	public void setRegidate(Date regidate) {
		this.regidate = regidate;
	}
	public String getContents() {
		return contents;
	}
	public void setContents(String contents) {
		this.contents = contents;
	}
	public String getEvent() {
		return event;
	}
	public void setEvent(String event) {
		this.event = event;
	}
	
	
}
