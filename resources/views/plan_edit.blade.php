@extends('layouts.main')

@section('content')




 	<!--banner-->
		     <div class="banner">
		    	<h2>
				<a href="home">Home</a>
				<i class="fa fa-angle-right"></i>
				<span>Forms</span>
				</h2>
		    </div>
		<!--//banner-->
 	<!--grid-->
<div class="grid-form">
 		<div class="grid-form1">
 		<h3 id="forms-example" class="">Basic Form</h3>

      <div class="form-group has-success">
        <label class="control-label" for="inputSuccess1">Input with success</label>
        <input type="text" class="form-control1" id="inputSuccess1">
      </div>
      <div class="form-group has-warning">
        <label class="control-label" for="inputWarning1">Input with warning</label>
        <input type="text" class="form-control1" id="inputWarning1">
      </div>

<form action="plan/update" method="POST">
<div class="form-group">
    <label for="exampleInputEmail1">プラン名</label>
    <input type="text" name="name" class="form-control" @isset($data['name'])value="{{ $data['name'] }}"@endif>
  </div>
@isset($error['name'])
  <div class="form-group has-error">
    <label class="control-label" for="inputError1">Input with error</label>
    <input type="text" class="form-control1" id="inputError1" value="{{ $error['name'] }}">
  </div>
@endif
  <div class="form-group">
    <label for="exampleInputPassword1">サブプラン名</label>
    <input type="text" name="name2" class="form-control" @isset($data['name2'])value="{{ $data['name2'] }}"@endif>
  </div>
@isset($error['name2'])
  <div class="form-group has-error">
    <label class="control-label" for="inputError1">Input with error</label>
    <input type="text" class="form-control1" id="inputError1" value="{{ $error['name2'] }}">
  </div>
@endif
  <div class="checkbox">
    <label>
      <input type="checkbox"> Check me out
    </label>
  </div>
  <button type="submit" class="btn btn-default">Submit</button>
  @isset($id)<input type="hidden" name="id" value="{{ $id }}">@endif
  {{ csrf_field() }}
</form>
</div>



@endsection