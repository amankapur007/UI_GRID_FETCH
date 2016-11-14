package com.aman.model;

public class UserDTO {
private String name;
private String gender;
private String company;
public String getName() {
	return name;
}
public void setName(String name) {
	this.name = name;
}
public String getGender() {
	return gender;
}
public void setGender(String gender) {
	this.gender = gender;
}
public String getCompany() {
	return company;
}
public void setCompany(String company) {
	this.company = company;
}
public UserDTO(String name, String gender, String company) {
	super();
	this.name = name;
	this.gender = gender;
	this.company = company;
}


}
