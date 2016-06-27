import {Component, OnInit} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

@Component({
    template: `
    <section id="home" class="parallax-section">
	<div class="container">
		<div class="row">
			<div class="col-md-12 col-sm-12">
				<h3 class="wow fadeInDown" data-wow-delay="0.2s">REVOLUTIONIZE YOUR AGRICULTURAL TRANSACTIONS</h3>
				<h1 class="wow fadeInDown">AGRITY</h1>
				<a [routerLink]="['MakeBid']" class="btn btn-danger wow fadeInUp" data-wow-delay="0.4s">CREATE NEW BID</a>
				<a [routerLink]="['Users']" class="btn btn-default smoothScroll wow fadeInUp" data-wow-delay="0.6s">VIEW EXISTING BIDS</a>
			</div>
		</div>
	</div>		
</section>
    `,
    styleUrls: ['assets/stylesheets/style.css'],
    directives: [ROUTER_DIRECTIVES]
})

export class HomeComponent  {
}