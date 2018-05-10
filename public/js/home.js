$(document).ready(function(){

	// GETTING THE DATA FROM THE DATABASE FIRST WHEN THE PAGE FINISHES LOADING ...

	$.ajax({
		url:'/api/clients/',
		type:'GET',
		success:function(data){
			if(data.length>0)
			{
				$('#clients table tbody').empty();
				for(var i = 0 ; i<data.length ; i++)
				{
					$('#clients table tbody').append('<tr><td hidden class="id">'+data[i]['_id']+'</td><td class="name">'+data[i]['name']+'</td><td class="telephone">'+data[i]['telephone']+'</td><td class="address">'+data[i]['address']+'</td><td><i class="fa fa-edit edit_item" title="edit this client"></i><i class="fa fa-trash delete_item" title="delete this client"></i></td></tr>');
				}
			}
		}
	})
	$.ajax({
		url:'/api/suppliers/',
		type:'GET',
		success:function(data){
			if(data.length>0)
			{
				$('#suppliers table tbody').empty();
				for(var i = 0 ; i<data.length ; i++)
				{
					$('#suppliers table tbody').append('<tr><td hidden class="id">'+data[i]['_id']+'</td><td class="name">'+data[i]['name']+'</td><td class="telephone">'+data[i]['telephone']+'</td><td class="address">'+data[i]['address']+'</td><td><i class="fa fa-edit edit_item" title="edit this client"></i><i class="fa fa-trash delete_item" title="delete this client"></i></td></tr>');
				}
			}
		}
	})
	$.ajax({
		url:'/api/expenses/',
		type:'GET',
		success:function(data){
			if(data.length>0)
			{
				$('#expenses table tbody').empty();
				for(var i = 0 ; i<data.length ; i++)
				{
					$('#expenses table tbody').append('<tr><td hidden class="id">'+data[i]['_id']+'</td><td class="day_date">'+data[i]['day_date']+'</td><td class="description">'+data[i]['description']+'</td><td class="salary">'+data[i]['salary']+'</td><td><i class="fa fa-edit edit_item" title="edit this client"></i><i class="fa fa-trash delete_item" title="delete this client"></i></td></tr>');
				}
			}
		}
	})
	$.ajax({
		url:'/api/bills/',
		type:'GET',
		success:function(data){
			if(data.length>0)
			{
				$('#bills table tbody').empty();
				for(var i = 0 ; i<data.length ; i++)
				{
					$('#bills table tbody').append('<tr><td hidden class="id">'+data[i]['_id']+'</td><td class="name">'+data[i]['name']+'</td><td class="day_date">'+data[i]['day_date']+'</td><td class="total">'+data[i]['total']+'</td><td class="paid">'+data[i]['paid']+'</td><td><i class="fa fa-edit edit_item" title="edit this client"></i><i class="fa fa-trash delete_item" title="delete this client"></i></td></tr>');
				}
			}
		}
	})
	$.ajax({
		url:'/api/items/',
		type:'GET',
		success:function(data){
			if(data.length>0)
			{
				$('#items table tbody').empty();
				for(var i = 0 ; i<data.length ; i++)
				{
					$('#items table tbody').append('<tr><td hidden class="id">'+data[i]['_id']+'</td><td class="type">'+data[i]['type']+'</td><td class="amount">'+data[i]['amount']+'</td><td class="buy_price">'+data[i]['buy_price']+'</td><td class="sell_price">'+data[i]['sell_price']+'</td><td><i class="fa fa-edit edit_item" title="edit this client"></i><i class="fa fa-trash delete_item" title="delete this client"></i></td></tr>');
				}
			}
		}
	})

	// SWITCHING BETWEEN THE CATEGORIES ...

	$(document).on('click' ,'.to_home' ,function(){
		$('#home').siblings('section').filter(function(){ return !$(this).is(":hidden"); }).fadeOut(400,function(){
			$('#home').fadeIn(400);
		});
	})
	$(document).on('click' ,'.to_clients' ,function(event){
		event.preventDefault();
		$('#clients').siblings('section').filter(function(){ return !$(this).is(":hidden"); }).fadeOut(400,function(){
			$('#clients').fadeIn(400);
		});
	})
	$(document).on('click' ,'.to_suppliers' ,function(event){
		event.preventDefault();
		$('#suppliers').siblings('section').filter(function(){ return !$(this).is(":hidden"); }).fadeOut(400,function(){
			$('#suppliers').fadeIn(400);
		});
	})
	$(document).on('click' ,'.to_expenses' ,function(event){
		event.preventDefault();
		$('#expenses').siblings('section').filter(function(){ return !$(this).is(":hidden"); }).fadeOut(400,function(){
			$('#expenses').fadeIn(400);
		});
	})
	$(document).on('click' ,'.to_bills' ,function(event){
		event.preventDefault();
		$('#bills').siblings('section').filter(function(){ return !$(this).is(":hidden"); }).fadeOut(400,function(){
			$('#bills').fadeIn(400);
		});
	})
	$(document).on('click' ,'.to_items' ,function(event){
		event.preventDefault();
		$('#items').siblings('section').filter(function(){ return !$(this).is(":hidden"); }).fadeOut(400,function(){
			$('#items').fadeIn(400);
		});
	})

	// DELETING AN ITEM OPERATION

	$(document).on('click' ,'.delete_item' ,function(){

		var element = $(this).parents('tr');
		var id = element.find('.id').text();
		var element_type; // FOR THE CONFIRMATION ALARM ...
		var request_url;
		if($(this).parents('#clients').length > 0)
		{
			element_type = 'client';
			request_url ='/api/clients/'+id;
		}
		else if($(this).parents('#suppliers').length > 0)
		{
			element_type = 'supplier';
			request_url ='/api/suppliers/'+id;
		}
		else if($(this).parents('#expenses').length > 0)
		{
			element_type = 'expense';
			request_url ='/api/expenses/'+id;
		}
		else if($(this).parents('#bills').length > 0)
		{
			element_type = 'bill';
			request_url ='/api/bills/'+id;
		}
		else if($(this).parents('#items').length > 0)
		{
			element_type = 'item';
			request_url ='/api/items/'+id;
		}
		// THE USER CONFIRM FIRST HE/SHE WANTS TO DELETE ...
		if(confirm('are you sure you want to delete this '+element_type+' ?'))
		{
			$.ajax({
				url:request_url,
				type:'DELETE',
				success:function(data){
					if(data)
						element.detach(); // REMOVE THIS ELEMENT FROM THE PAGE ...
				}
			})
		}
	})

	// CLICK ON ADDING ELEMENT ...
	// HIDE ALL SECTIONS AND SHOW THE FORM FOR ADDING THIS ELEMENT TO THE DATABASE ...

	$(document).on('click' ,'.add_item' ,function(){
		if($(this).parents('#clients').length > 0)
		{
			$('.clients_form h2').text('Add Client');
			$('.clients_form input').val('');
			$('.clients_form .save_btn').val('Add');
			$('section').hide();
			$('.clients_form').show();
		}
		else if($(this).parents('#suppliers').length > 0)
		{
			$('.suppliers_form h2').text('Add Supplier');
			$('.suppliers_form input').val('');
			$('.suppliers_form .save_btn').val('Add');
			$('section').hide();
			$('.suppliers_form').show();
		}
		else if($(this).parents('#expenses').length > 0)
		{
			$('.expenses_form h2').text('Add Expense');
			$('.expenses_form input').filter('.save_btn').val('');
			$('.expenses_form .save_btn').val('Add');
			$('section').hide();
			$('.expenses_form').show();
		}
		else if($(this).parents('#bills').length > 0)
		{
			$('.bills_form h2').text('Add Bill');
			$('.bills_form input').val('');
			$('.bills_form .save_btn').val('Add');
			$('section').hide();
			$('.bills_form').show();
		}
		else if($(this).parents('#items').length > 0)
		{
			$('.items_form h2').text('Add Item');
			$('.items_form input').val('');
			$('.items_form .save_btn').val('Add');
			$('section').hide();
			$('.items_form').show();
		}
	})

	var item_Selector; // FOR THE ELEMENT CHOSEN TO BE FETCHED IN CASE OF EDITING ...

	$(document).on('click' ,'.edit_item' ,function(){
		item_Selector = $(this).parents('tr');
		if($(this).parents('#clients').length > 0)
		{
			var name 			= $(this).parent().siblings('.name').text();
			var telephone 	= $(this).parent().siblings('.telephone').text();
			var address 		= $(this).parent().siblings('.address').text();
			var id 				= $(this).parent().siblings('.id').text();

			$('.clients_form h2').text('Edit Client');
			$('.clients_form .save_btn').val('Edit');
			$('.clients_form .name').val(name); 
			$('.clients_form .telephone').val(telephone); 
			$('.clients_form .address').val(address); 
			$('.clients_form .id').val(id); 

			$('section').hide();
			$('.clients_form').show();
		}
		else if($(this).parents('#suppliers').length > 0)
		{
			var name 			= $(this).parent().siblings('.name').text();
			var telephone 	= $(this).parent().siblings('.telephone').text();
			var address 		= $(this).parent().siblings('.address').text();
			var id 				= $(this).parent().siblings('.id').text();

			$('.suppliers_form h2').text('Edit supplier');
			$('.suppliers_form .save_btn').val('Edit');
			$('.suppliers_form .name').val(name); 
			$('.suppliers_form .telephone').val(telephone); 
			$('.suppliers_form .address').val(address); 
			$('.suppliers_form .id').val(id); 
			
			$('section').hide();
			$('.suppliers_form').show();
		}
		else if($(this).parents('#expenses').length > 0)
		{
			var day_date 	= $(this).parent().siblings('.day_date').text();
			var description = $(this).parent().siblings('.description').text();
			var salary 		= $(this).parent().siblings('.salary').text();
			var id 			= $(this).parent().siblings('.id').text();

			$('.expenses_form h2').text('Edit expense');
			$('.expenses_form .save_btn').val('Edit');
			$('.expenses_form .description').val(description); 
			$('.expenses_form .day_date').val(day_date); 
			$('.expenses_form .salary').val(salary); 
			$('.expenses_form .id').val(id); 
			
			$('section').hide();
			$('.expenses_form').show();
		}
		else if($(this).parents('#bills').length > 0)
		{
			var name 		= $(this).parent().siblings('.name').text();
			var day_date 	= $(this).parent().siblings('.day_date').text();
			var total 		= $(this).parent().siblings('.total').text();
			var paid 		= $(this).parent().siblings('.paid').text();
			var id 			= $(this).parent().siblings('.id').text();

			$('.bills_form h2').text('Edit bill');
			$('.bills_form .save_btn').val('Edit');
			$('.bills_form .name').val(name); 
			$('.bills_form .day_date').val(day_date); 
			$('.bills_form .total').val(total); 
			$('.bills_form .paid').val(paid); 
			$('.bills_form .id').val(id); 
			
			$('section').hide();
			$('.bills_form').show();
		}
		else if($(this).parents('#items').length > 0)
		{
			var type 		= $(this).parent().siblings('.type').text();
			var amount 		= $(this).parent().siblings('.amount').text();
			var buy_price 	= $(this).parent().siblings('.buy_price').text();
			var sell_price 	= $(this).parent().siblings('.sell_price').text();
			var id 			= $(this).parent().siblings('.id').text();

			$('.items_form h2').text('Edit item');
			$('.items_form .save_btn').val('Edit');
			$('.items_form .type').val(type); 
			$('.items_form .amount').val(amount); 
			$('.items_form .buy_price').val(buy_price); 
			$('.items_form .sell_price').val(sell_price); 
			$('.items_form .id').val(id); 
			
			$('section').hide();
			$('.items_form').show();
		}
	})

	// WHEN CLICKING ON SAVE BUTTON ( TO ADD , OR TO EDIT ) ...

	$(document).on('click', ".save_btn", function(event){
		event.preventDefault();
		if($(this).val() === "Add")
		{
			if($(this).parents('.clients_form').length > 0)
			{
				var name = $('.clients_form .name').val(); 
				var telephone = $('.clients_form .telephone').val(); 
				var address = $('.clients_form .address').val(); 
				var data_to_send = {'name' : name, 'telephone' : telephone, 'address' : address};
				$.ajax({
					url:'/api/clients/',
					type:'POST',
					dataType:'json',
					data:data_to_send,
					success:function(data){
						if(data)
						{
							$('#clients table tbody').append('<tr><td hidden class="id">'+data[i]['_id']+'</td><td class="name">'+data[i]['name']+'</td><td class="telephone">'+data[i]['telephone']+'</td><td class="address">'+data[i]['address']+'</td><td><i class="fa fa-edit edit_item" title="edit this client"></i><i class="fa fa-trash delete_item" title="delete this client"></i></td></tr>');
							$('section').hide();
							$('#clients').fadeIn(400)
						}
					}
				})
			}
			else if($(this).parents('.suppliers_form').length > 0)
			{
				var name = $('.suppliers_form .name').val(); 
				var telephone = $('.suppliers_form .telephone').val(); 
				var address = $('.suppliers_form .address').val(); 
				var data_to_send = {'name' : name, 'telephone' : telephone, 'address' : address};
				$.ajax({
					url:'/api/suppliers/',
					type:'POST',
					dataType:'json',
					data:data_to_send,
					success:function(data){
						if(data)
						{
							$('#suppliers table tbody').append('<tr><td hidden class="id">'+data[i]['_id']+'</td><td class="name">'+data[i]['name']+'</td><td class="telephone">'+data[i]['telephone']+'</td><td class="address">'+data[i]['address']+'</td><td><i class="fa fa-edit edit_item" title="edit this client"></i><i class="fa fa-trash delete_item" title="delete this client"></i></td></tr>');
							$('section').hide();
							$('#suppliers').fadeIn(400)
						}
					}
				})
			}
			else if($(this).parents('.expenses_form').length > 0)
			{
				var description = $('.expenses_form .description').val(); 
				var day_date = $('.expenses_form .day_date').val(); 
				var salary = $('.expenses_form .salary').val();  
				var data_to_send = {'description' : description, 'day_date' : day_date, 'salary' : salary};
				$.ajax({
					url:'api/expenses/',
					type:'POST',
					dataType:'json',
					data:data_to_send,
					success:function(data){
						if(data)
						{
							$('#expenses table tbody').append('<tr><td hidden class="id">'+data[i]['_id']+'</td><td class="day_date">'+data[i]['day_date']+'</td><td class="description">'+data[i]['description']+'</td><td class="salary">'+data[i]['salary']+'</td><td><i class="fa fa-edit edit_item" title="edit this client"></i><i class="fa fa-trash delete_item" title="delete this client"></i></td></tr>');
							$('section').hide();
							$('#expenses').fadeIn(400)
						}
					}
				})
			}
			else if($(this).parents('.bills_form').length > 0)
			{
				var name = $('.bills_form .name').val(); 
				var day_date = $('.bills_form .day_date').val(); 
				var total = $('.bills_form .total').val(); 
				var paid = $('.bills_form .paid').val(); 
				var data_to_send = {'name' : name, 'day_date' : day_date, 'total' : total, 'paid' : paid};
				$.ajax({
					url:'api/bills/',
					type:'POST',
					dataType:'json',
					data:data_to_send,
					success:function(data){
						if(data)
						{
							$('#bills table tbody').append('<tr><td hidden class="id">'+data[i]['_id']+'</td><td class="name">'+data[i]['name']+'</td><td class="day_date">'+data[i]['day_date']+'</td><td class="total">'+data[i]['total']+'</td><td class="paid">'+data[i]['paid']+'</td><td><i class="fa fa-edit edit_item" title="edit this client"></i><i class="fa fa-trash delete_item" title="delete this client"></i></td></tr>');
							$('section').hide();
							$('#bills').fadeIn(400)
						}
					}
				})
			}
			else if($(this).parents('.items_form').length > 0)
			{
				var type = $('.items_form .type').val(); 
				var amount = $('.items_form .amount').val(); 
				var buy_price = $('.items_form .buy_price').val(); 
				var sell_price = $('.items_form .sell_price').val(); 
				var data_to_send = {'type' : type, 'amount' : amount, 'sell_price' : sell_price, 'buy_price' : buy_price};
				$.ajax({
					url:'api/items/',
					type:'POST',
					dataType:'json',
					data:data_to_send,
					success:function(data){
						if(data)
						{
							$('#items table tbody').append('<tr><td hidden class="id">'+data[i]['_id']+'</td><td class="type">'+data[i]['type']+'</td><td class="amount">'+data[i]['amount']+'</td><td class="buy_price">'+data[i]['buy_price']+'</td><td class="sell_price">'+data[i]['sell_price']+'</td><td><i class="fa fa-edit edit_item" title="edit this client"></i><i class="fa fa-trash delete_item" title="delete this client"></i></td></tr>');
							$('section').hide();
							$('#items').fadeIn(400)
						}
					}
				})
			}
		}
		else
		{
			if(item_Selector.parents('#clients').length > 0)
			{
				var name = $('.clients_form .name').val(); 
				var telephone = $('.clients_form .telephone').val(); 
				var address = $('.clients_form .address').val(); 
				var id = $('.clients_form .id').val(); 
				var data_to_send = {'name' : name, 'telephone' : telephone, 'address' : address};
				$.ajax({
					url:'/api/clients/'+id,
					type:'PUT',
					dataType:'json',
					data:data_to_send,
					success:function(data){
						if(data)
						{
							item_Selector.find('.name').text(name);
							item_Selector.find('.telephone').text(telephone);
							item_Selector.find('.address').text(address);
							$('section').hide();
							$('#clients').fadeIn(400)
						}
					}
				})
			}
			else if(item_Selector.parents('#suppliers').length > 0)
			{
				var name = $('.suppliers_form .name').val(); 
				var telephone = $('.suppliers_form .telephone').val(); 
				var address = $('.suppliers_form .address').val(); 
				var id = $('.suppliers_form .id').val(); 
				var data_to_send = {'name' : name, 'telephone' : telephone, 'address' : address};
				$.ajax({
					url:'/api/suppliers/'+id,
					type:'PUT',
					dataType:'json',
					data:data_to_send,
					success:function(data){
						if(data)
						{
							item_Selector.find('.name').text(name);
							item_Selector.find('.telephone').text(telephone);
							item_Selector.find('.address').text(address);
							$('section').hide();
							$('#suppliers').fadeIn(400)
						}
					}
				})
			}
			else if(item_Selector.parents('#expenses').length > 0)
			{
				var description = $('.expenses_form .description').val(); 
				var day_date = $('.expenses_form .day_date').val(); 
				var salary = $('.expenses_form .salary').val();  
				var id = $('.expenses_form .id').val(); 
				var data_to_send = {'description' : description, 'day_date' : day_date, 'salary' : salary};
				$.ajax({
					url:'api/expenses/'+id,
					type:'PUT',
					dataType:'json',
					data:data_to_send,
					success:function(data){
						if(data)
						{
							item_Selector.find('.description').text(description);
							item_Selector.find('.day_date').text(day_date);
							item_Selector.find('.salary').text(salary);
							$('section').hide();
							$('#expenses').fadeIn(400)
						}
					}
				})
			}
			else if(item_Selector.parents('#bills').length > 0)
			{
				var name = $('.bills_form .name').val(); 
				var day_date = $('.bills_form .day_date').val(); 
				var total = $('.bills_form .total').val(); 
				var paid = $('.bills_form .paid').val(); 
				var id = $('.bills_form .id').val(); 
				var data_to_send = {'name' : name, 'day_date' : day_date, 'total' : total, 'paid' : paid};
				$.ajax({
					url:'api/bills/'+id,
					type:'PUT',
					dataType:'json',
					data:data_to_send,
					success:function(data){
						if(data)
						{
							item_Selector.find('.name').text(name);
							item_Selector.find('.day_date').text(day_date);
							item_Selector.find('.total').text(total);
							item_Selector.find('.paid').text(paid);
							$('section').hide();
							$('#bills').fadeIn(400)
						}
					}
				})
			}
			else if(item_Selector.parents('#items').length > 0)
			{
				var type = $('.items_form .type').val(); 
				var amount = $('.items_form .amount').val(); 
				var buy_price = $('.items_form .buy_price').val(); 
				var sell_price = $('.items_form .sell_price').val(); 
				var id = $('.items_form .id').val(); 
				var data_to_send = {'type' : type, 'amount' : amount, 'buy_price' : buy_price, 'sell_price' : sell_price};
				$.ajax({
					url:'api/items/'+id,
					type:'PUT',
					dataType:'json',
					data:data_to_send,
					success:function(data){
						if(data)
						{
							item_Selector.find('.type').text(type);
							item_Selector.find('.amount').text(amount);
							item_Selector.find('.buy_price').text(buy_price);
							item_Selector.find('.sell_price').text(sell_price);
							$('section').hide();
							$('#items').fadeIn(400)
						}
					}
				})
			}
		}
	})
})