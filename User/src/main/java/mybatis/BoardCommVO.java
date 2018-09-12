package mybatis;

import java.sql.Date;

public class BoardCommVO {

	private String num;
	private String id;
	private String name;
	private String title;
	private String contents;
	private Date regidate;
	private String viewcnt;
	private String attfile;
	private String b_id;
	private int reply;
	private String com_idx;
	private String com_name;
	private Date com_regidate;
	private String com_content;
	private String board_idx;
	//생성자
	public BoardCommVO() {};
	public BoardCommVO(String num, String id, String name, String title, String contents, Date regidate, String viewcnt,
			String attfile, String b_id, int reply, String com_idx, String com_name, Date com_regidate,
			String com_content, String board_idx) {
		this.num = num;
		this.id = id;
		this.name = name;
		this.title = title;
		this.contents = contents;
		this.regidate = regidate;
		this.viewcnt = viewcnt;
		this.attfile = attfile;
		this.b_id = b_id;
		this.reply = reply;
		this.com_idx = com_idx;
		this.com_name = com_name;
		this.com_regidate = com_regidate;
		this.com_content = com_content;
		this.board_idx = board_idx;
	}
	//getter/setter
	public String getNum() {
		return num;
	}
	public void setNum(String num) {
		this.num = num;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContents() {
		return contents;
	}
	public void setContents(String contents) {
		this.contents = contents;
	}
	public Date getRegidate() {
		return regidate;
	}
	public void setRegidate(Date regidate) {
		this.regidate = regidate;
	}
	public String getViewcnt() {
		return viewcnt;
	}
	public void setViewcnt(String viewcnt) {
		this.viewcnt = viewcnt;
	}
	public String getAttfile() {
		return attfile;
	}
	public void setAttfile(String attfile) {
		this.attfile = attfile;
	}
	public String getB_id() {
		return b_id;
	}
	public void setB_id(String b_id) {
		this.b_id = b_id;
	}
	public int getReply() {
		return reply;
	}
	public void setReply(int reply) {
		this.reply = reply;
	}
	public String getCom_idx() {
		return com_idx;
	}
	public void setCom_idx(String com_idx) {
		this.com_idx = com_idx;
	}
	public String getCom_name() {
		return com_name;
	}
	public void setCom_name(String com_name) {
		this.com_name = com_name;
	}
	public Date getCom_regidate() {
		return com_regidate;
	}
	public void setCom_regidate(Date com_regidate) {
		this.com_regidate = com_regidate;
	}
	public String getCom_content() {
		return com_content;
	}
	public void setCom_content(String com_content) {
		this.com_content = com_content;
	}
	public String getBoard_idx() {
		return board_idx;
	}
	public void setBoard_idx(String board_idx) {
		this.board_idx = board_idx;
	}
	
	
}
