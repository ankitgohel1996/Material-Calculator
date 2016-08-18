var expression;
var instant=0;
var final;
var clear=0;
var deleteCount=0;
var tempExpression="";
var expression="";


$(document).ready(function($) 
{
	var numberLoaded=false;

	$(".button").click(function()
	{ 
		if(numberLoaded==true)
		{
			var alreadyPresent=$('.resultTop').text();
			var a=$(this).data('val');
			var put=alreadyPresent.concat(a);
			$('.resultTop').text(put);	

			if(instant==1)
				calculate();
		}
		else
		{
			var a=$(this).data("val");
			$('.resultTop').text(a);	
			numberLoaded=true;
		}
	}); 

	$(".operator").click(function()
	{ 
		if(numberLoaded==true)
		{
			var alreadyPresent=$('.resultTop').text();
			var a=$(this).data('val');
			var put=alreadyPresent.concat(a);
			$('.resultTop').text(put);
			instant=1;
		}
	}); 

	$("#equalto").click(function()
	{ 
		$('.resultTop').html(final);
		$('.resultBottom').html("");
		clear=1;	
		expression="";
	});

	$("#delete").click(function()
	{
		if(deleteCount==0)
		{
			tempExpression=$('.resultTop').text();
			tempExpression=tempExpression.replace(/\D/g,'');

			tempExpression=tempExpression.substring(0,tempExpression.length-1);

			$('.resultTop').text(tempExpression);
		 }
		else
		{
			expression=expression.substring(0,expression.length-1);
			$('.resultTop').text(expression);

			var lastChar=expression.charAt(expression.length-1);
		}
		

		if(lastChar=='+'||lastChar=='-'||lastChar=='x'||lastChar=='/')
		{
			$('.resultBottom').text("");
		}
		else
		{
			calculate();
		}

		if(clear==1)
		{
			$('.resultTop').text("");
			$('.resultBottom').text("");
			clear=0;
		}
			
	});
});


function calculate()
{
	expression=$('.resultTop').text();
	deleteCount=1;

	for(var i=0;i<expression.length;i++)
	{
		if(expression.charAt(i)=='+') 
			add();
		else if(expression.charAt(i)=='-')
			subtract();
		else if (expression.charAt(i)=="x")
			multiply();
		else if(expression.charAt(i)=="/")
			divide();
	}
}

function add()
{
	var res=expression.split('+');
	final=0;

	for(var i=0;i<res.length;i++)
	{
		final=final+Number(res[i]);
	}
	$('.resultBottom').text(final);
}

function subtract()
{
	var res=expression.split('-');
	final=res[0];

	for(var i=1;i<res.length;i++)
	{
		final=final-Number(res[i]);
	}
	$('.resultBottom').text(final);
}

function multiply()
{
	var res=expression.split('x');
	final=1;

	for(var i=0;i<res.length;i++)
	{
		final=final*Number(res[i]);
	}
	$('.resultBottom').text(final);
}

function divide()
{
	var res=expression.split("/");
	final=Number(res[0])/Number(res[1]);
	final= +final.toFixed(6);
	$('.resultBottom').text(final);
}