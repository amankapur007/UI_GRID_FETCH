package com.aman.controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.aman.model.UserDTO;


@Controller
public class Controllers {
	@RequestMapping(value="data",method=RequestMethod.GET)
	public @ResponseBody ArrayList<UserDTO> data(@RequestParam String param1, @RequestParam String param2)
	{
		Connection con=null;
		PreparedStatement pst=null;
		System.out.println("aman");
		System.out.println("next page"+param1);
		System.out.println("nextPageSize"+param2);
		ArrayList<UserDTO> list=new ArrayList<UserDTO>();
		try {
			Class.forName("com.mysql.jdbc.Driver");
			con=DriverManager.getConnection("jdbc:mysql://localhost:3306/hdfc","root","root");
			pst=con.prepareStatement("select * from REVIEW LIMIT "+param1+","+param2); 
			ResultSet rst=pst.executeQuery();
			while(rst.next())
			{
				UserDTO user=new UserDTO(rst.getString(1),rst.getString(2),rst.getString(3));
				list.add(user);
			}
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return list;
	}
	@RequestMapping(value="totalPages")
	public @ResponseBody int totalPages()
	{
		Connection con=null;
		PreparedStatement pst=null;
		int count=0;
		try {
		Class.forName("com.mysql.jdbc.Driver");
		con=DriverManager.getConnection("jdbc:mysql://localhost:3306/hdfc","root","root");
		pst=con.prepareStatement("select count(*) from REVIEW"); 
		ResultSet rst=pst.executeQuery();
		while(rst.next())
		{
			count=rst.getInt(1);
		}
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	
		return count;
	}

	
}
