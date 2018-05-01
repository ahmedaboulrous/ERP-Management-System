$(document).ready(function(){
	$(document).on('click' ,'.to_clients' ,function(){
		$('#clients').siblings('section').filter(function(){ return !$(this).is(":hidden"); }).fadeOut(400,function(){
			$('#clients').fadeIn(400);
		});
	})
	$(document).on('click' ,'.to_suppliers' ,function(){
		$('#suppliers').siblings('section').filter(function(){ return !$(this).is(":hidden"); }).fadeOut(400,function(){
			$('#suppliers').show(400);
		});
	})
	$(document).on('click' ,'.to_expenses' ,function(){
		$('#expenses').siblings('section').filter(function(){ return !$(this).is(":hidden"); }).fadeOut(400,function(){
			$('#expenses').fadeIn(400);
		});
	})
	$(document).on('click' ,'.to_bills' ,function(){
		$('#bills').siblings('section').filter(function(){ return !$(this).is(":hidden"); }).fadeOut(400,function(){
			$('#bills').fadeIn(400);
		});
	})
	$(document).on('click' ,'.to_items' ,function(){
		$('#items').siblings('section').filter(function(){ return !$(this).is(":hidden"); }).fadeOut(400,function(){
			$('#items').fadeIn(400);
		});
	})

	$(document).on('click' ,'.delete_item' ,function(){

		var element = $(this).parents('tr');
		var id = element.find('.id').length;
		console.log(element);
		var element_type;
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

		if(confirm('are you sure you want to delete this '+element_type+' ?'))
		{
			$.ajax({
				url:request_url,
				type:'DELETE',
				success:function(data){
					if(data)
						element.detach();
				}
			})
		}
	})

	$(document).on('click' ,'.add_item' ,function(){
		if($(this).parents('#clients').length > 0)
		{
			$('.clients_form h2').text('Add Client');
			$('.clients_form .btn').val('Add');
			$('section').hide();
			$('.clients_form').show();
		}
		else if($(this).parents('#suppliers').length > 0)
		{
			$('.suppliers_form h2').text('Add Supplier');
			$('.suppliers_form .btn').val('Add');
			$('section').hide();
			$('.suppliers_form').show();
		}
		else if($(this).parents('#expenses').length > 0)
		{
			$('.expenses_form h2').text('Add Expense');
			$('.expenses_form .btn').val('Add');
			$('section').hide();
			$('.expenses_form').show();
		}
		else if($(this).parents('#bills').length > 0)
		{
			$('.bills_form h2').text('Add Bill');
			$('.bills_form .btn').val('Add');
			$('section').hide();
			$('.bills_form').show();
		}
		else if($(this).parents('#items').length > 0)
		{
			$('.items_form h2').text('Add Item');
			$('.items_form .btn').val('Add');
			$('section').hide();
			$('.items_form').show();
		}
	})

	$(document).on('click' ,'.edit_item' ,function(){
		if($(this).parents('#clients').length > 0)
		{
			var name 			= $(this).parent().siblings('.name').text();
			var phone_number 	= $(this).parent().siblings('.phone_number').text();
			var address 		= $(this).parent().siblings('.address').text();
			var id 				= $(this).parent().siblings('.id').val();

			$('.clients_form h2').text('Edit Client');
			$('.clients_form .btn').val('Edit');
			$('.clients_form .name').val(name); 
			$('.clients_form .phone_number').val(phone_number); 
			$('.clients_form .address').val(address); 
			$('.clients_form .id').val(id); 
			
			$('section').hide();
			$('.clients_form').show();
		}
		else if($(this).parents('#suppliers').length > 0)
		{
			var name 			= $(this).parent().siblings('.name').text();
			var phone_number 	= $(this).parent().siblings('.phone_number').text();
			var address 		= $(this).parent().siblings('.address').text();
			var id 				= $(this).parent().siblings('.id').val();

			$('.suppliers_form h2').text('Edit supplier');
			$('.suppliers_form .btn').val('Edit');
			$('.suppliers_form .name').val(name); 
			$('.suppliers_form .phone_number').val(phone_number); 
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
			var id 			= $(this).parent().siblings('.id').val();

			$('.expenses_form h2').text('Edit expense');
			$('.expenses_form .btn').val('Edit');
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
			var id 			= $(this).parent().siblings('.id').val();

			$('.bills_form h2').text('Edit bill');
			$('.bills_form .btn').val('Edit');
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
			var id 			= $(this).parent().siblings('.id').val();

			$('.items_form h2').text('Edit item');
			$('.items_form .btn').val('Edit');
			$('.items_form .name').val(name); 
			$('.items_form .day_date').val(day_date); 
			$('.items_form .total').val(total); 
			$('.items_form .paid').val(paid); 
			$('.items_form .id').val(id); 
			
			$('section').hide();
			$('.items_form').show();
		}
	})
})