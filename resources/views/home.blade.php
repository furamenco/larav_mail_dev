@extends('layouts.main')

@section('content')

  	<!--banner-->
		    <div class="banner">
		    	<h2>
				<a href="index.html">Home</a>
				<i class="fa fa-angle-right"></i>
				<span>Layout</span>
				</h2>
		    </div>
		<!--//banner-->
 	<!--grid-->
 	<div class="grid-system">
 		<!---->
 		<div class="horz-grid">
 		<div class="grid-hor">
 		<h3 id="grid-example-basic">プラン一覧</h3>
 		<p class=""><a href="plan"><code>プランを作成する</code></a></p>
			</div>
			<!---->

			 <div class="row show-grid">
			  <div class="col-md-1">.col-md-1</div>
			  <div class="col-md-1">.col-md-1</div>
			  <div class="col-md-1">.col-md-1</div>
			  <div class="col-md-1">.col-md-1</div>
			  <div class="col-md-1">.col-md-1</div>
			  <div class="col-md-1">.col-md-1</div>
			  <div class="col-md-1">.col-md-1</div>
			  <div class="col-md-1">.col-md-1</div>
			  <div class="col-md-1">.col-md-1</div>
			  <div class="col-md-1">.col-md-1</div>
			  <div class="col-md-1">.col-md-1</div>
			  <div class="col-md-1">.col-md-1</div>
			</div>
			<div class="row show-grid">

			  <div class="col-md-8">プラン名</div>
			  <div class="col-md-2">作成日</div>
			  <div class="col-md-2">更新日</div>
			@foreach ($data as $row)
			<div class="col-md-8"><a href="plan?id={{ $row['id'] }}">{{ $row['name'] }}</a></div>
			<div class="col-md-2">{{ $row['created_at'] }}</div>
			<div class="col-md-2">{{ $row['updated_at'] }}</div>
			@endforeach
			</div>
			<div class="row show-grid">
			  <div class="col-md-4">.col-md-4</div>
			  <div class="col-md-4">.col-md-4</div>
			  <div class="col-md-4">.col-md-4</div>
			</div>
			<div class="row show-grid">
			  <div class="col-md-6">.col-md-6</div>
			  <div class="col-md-6">.col-md-6</div>
			</div>
		</div>
  </div>
</div>
@endsection
