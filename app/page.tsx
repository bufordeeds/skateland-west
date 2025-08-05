import { Star, Calendar, Phone } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SITE_CONFIG, PARTY_PACKAGES, TESTIMONIALS } from '@/lib/constants';

export default function Home() {
	return (
		<div className='min-h-screen'>
			{/* Hero Section */}
			<section className='relative bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-16 md:py-24'>
				<Container>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center'>
						{/* Left Column - Main Content */}
						<div className='space-y-6 order-1 lg:order-1'>
							<Badge variant='secondary' className='w-fit'>
								⭐ Rated {SITE_CONFIG.rating}/5 by{' '}
								{SITE_CONFIG.reviewCount}+ families
							</Badge>
							<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight'>
								San Antonio&apos;s Premier{' '}
								<span className='text-primary'>
									Family Skating
								</span>{' '}
								Experience
							</h1>
							<p className='text-xl text-muted-foreground leading-relaxed'>
								Creating magical memories for families since
								1985. From stress-free birthday parties to fun
								family nights, we handle every detail.
							</p>
							<div className='flex flex-col sm:flex-row gap-4'>
								<Button size='lg' className='text-lg px-8'>
									<Calendar className='size-5 mr-2' />
									Book Your Party Today
								</Button>
								<Button
									variant='outline'
									size='lg'
									className='text-lg px-8'
									asChild
								>
									<a
										href={`tel:${SITE_CONFIG.phone.replace(
											/\D/g,
											''
										)}`}
									>
										<Phone className='size-5 mr-2' />
										Call Now: {SITE_CONFIG.phone}
									</a>
								</Button>
							</div>
							<div className='flex flex-wrap items-center gap-6 pt-4'>
								<div className='text-center'>
									<div className='text-2xl font-bold text-primary'>
										38+
									</div>
									<div className='text-sm text-muted-foreground'>
										Years in Business
									</div>
								</div>
								<div className='text-center'>
									<div className='text-2xl font-bold text-primary'>
										10K+
									</div>
									<div className='text-sm text-muted-foreground'>
										Parties Hosted
									</div>
								</div>
								<div className='text-center'>
									<div className='text-2xl font-bold text-primary'>
										50K+
									</div>
									<div className='text-sm text-muted-foreground'>
										Happy Families
									</div>
								</div>
							</div>
						</div>

						{/* Right Column - Special Offer Card */}
						<div className='order-2 lg:order-2'>
							<div className='bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 md:p-8 text-white w-full'>
								<div className='space-y-4'>
									<h3 className='text-xl md:text-2xl font-bold'>
										This Week&apos;s Special!
									</h3>
									<p className='text-primary-foreground/90 text-sm md:text-base'>
										Book any birthday party package and get
										a FREE photo session with our
										professional photographer.
									</p>
									<Button
										variant='secondary'
										size='lg'
										className='w-full'
									>
										Claim This Offer
									</Button>
								</div>
							</div>
						</div>
					</div>
				</Container>
			</section>

			{/* Quick Action Cards */}
			<section className='py-16 bg-muted/30'>
				<Container>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
						<Card className='hover:shadow-lg transition-shadow cursor-pointer h-full'>
							<CardHeader className='text-center pb-4'>
								<div className='mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-2xl'>
									🎉
								</div>
								<CardTitle className='text-lg'>
									Birthday Parties
								</CardTitle>
								<CardDescription>
									Stress-free party planning
								</CardDescription>
							</CardHeader>
							<CardContent className='text-center'>
								<ul className='text-sm text-muted-foreground space-y-1 mb-4'>
									<li>• Package options available</li>
									<li>• Instant booking</li>
									<li>• Photo gallery included</li>
								</ul>
								<Button
									variant='outline'
									size='sm'
									className='w-full'
								>
									View Packages
								</Button>
							</CardContent>
						</Card>

						<Card className='hover:shadow-lg transition-shadow cursor-pointer h-full'>
							<CardHeader className='text-center pb-4'>
								<div className='mx-auto w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4 text-2xl'>
									🎵
								</div>
								<CardTitle className='text-lg'>
									Open Skating
								</CardTitle>
								<CardDescription>
									Family fun every day
								</CardDescription>
							</CardHeader>
							<CardContent className='text-center'>
								<ul className='text-sm text-muted-foreground space-y-1 mb-4'>
									<li>
										• Today&apos;s hours:{' '}
										{SITE_CONFIG.hours.saturday}
									</li>
									<li>• All skill levels welcome</li>
									<li>• Special events weekly</li>
								</ul>
								<Button
									variant='outline'
									size='sm'
									className='w-full'
								>
									View Schedule
								</Button>
							</CardContent>
						</Card>

						<Card className='hover:shadow-lg transition-shadow cursor-pointer h-full'>
							<CardHeader className='text-center pb-4'>
								<div className='mx-auto w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4 text-2xl'>
									🏢
								</div>
								<CardTitle className='text-lg'>
									Private Events
								</CardTitle>
								<CardDescription>
									Corporate & group events
								</CardDescription>
							</CardHeader>
							<CardContent className='text-center'>
								<ul className='text-sm text-muted-foreground space-y-1 mb-4'>
									<li>• Team building activities</li>
									<li>• Fundraiser events</li>
									<li>• Custom packages</li>
								</ul>
								<Button
									variant='outline'
									size='sm'
									className='w-full'
								>
									Learn More
								</Button>
							</CardContent>
						</Card>

						<Card className='hover:shadow-lg transition-shadow cursor-pointer h-full'>
							<CardHeader className='text-center pb-4'>
								<div className='mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-2xl'>
									🥇
								</div>
								<CardTitle className='text-lg'>
									Skate Lessons
								</CardTitle>
								<CardDescription>
									Learn to skate like a pro
								</CardDescription>
							</CardHeader>
							<CardContent className='text-center'>
								<ul className='text-sm text-muted-foreground space-y-1 mb-4'>
									<li>• Age groups 3-99</li>
									<li>• All skill levels</li>
									<li>• Register online</li>
								</ul>
								<Button
									variant='outline'
									size='sm'
									className='w-full'
								>
									Register Now
								</Button>
							</CardContent>
						</Card>
					</div>
				</Container>
			</section>

			{/* Featured Packages */}
			<section className='py-16'>
				<Container>
					<div className='text-center mb-12'>
						<h2 className='text-3xl md:text-4xl font-bold mb-4'>
							Birthday Party Packages
						</h2>
						<p className='text-xl text-muted-foreground'>
							Choose the perfect package for your celebration. All
							packages include skate rentals and a dedicated party
							host.
						</p>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						{PARTY_PACKAGES.map((pkg) => (
							<Card
								key={pkg.id}
								className={`h-full flex flex-col ${
									pkg.featured
										? 'border-primary shadow-lg relative'
										: ''
								}`}
							>
								<CardHeader className='text-center flex-shrink-0'>
									{pkg.featured && (
										<Badge className='w-fit mx-auto mb-2'>
											Most Popular
										</Badge>
									)}
									<CardTitle className='text-2xl'>
										{pkg.name}
									</CardTitle>
									<CardDescription className='space-y-1'>
										<div>
											<span className='text-3xl font-bold text-primary'>
												${pkg.price}
											</span>
											<span className='text-muted-foreground'>
												{' '}
												/ {pkg.duration}
											</span>
										</div>
										<p className='text-sm text-muted-foreground'>
											For up to {pkg.guests} guests
										</p>
									</CardDescription>
								</CardHeader>
								<CardContent className='flex-grow flex flex-col'>
									<ul className='space-y-2 mb-6 flex-grow'>
										{pkg.features.map((feature, idx) => (
											<li
												key={idx}
												className='flex items-start gap-2 text-sm'
											>
												<span className='text-primary mt-1 flex-shrink-0'>
													✓
												</span>
												<span>{feature}</span>
											</li>
										))}
									</ul>
									<Button
										className='w-full mt-auto'
										variant={
											pkg.featured ? 'default' : 'outline'
										}
									>
										Select This Package
									</Button>
								</CardContent>
							</Card>
						))}
					</div>
				</Container>
			</section>

			{/* Testimonials */}
			<section className='py-16 bg-muted/30'>
				<Container>
					<div className='text-center mb-12'>
						<h2 className='text-3xl md:text-4xl font-bold mb-4'>
							What Families Are Saying
						</h2>
						<div className='flex items-center justify-center gap-2 mb-4'>
							{[...Array(5)].map((_, i) => (
								<Star
									key={i}
									className='size-6 fill-primary text-primary'
								/>
							))}
							<span className='text-lg font-semibold ml-2'>
								{SITE_CONFIG.rating}/5 from{' '}
								{SITE_CONFIG.reviewCount}+ reviews
							</span>
						</div>
					</div>
					<div className='grid md:grid-cols-3 gap-8'>
						{TESTIMONIALS.map((testimonial) => (
							<Card key={testimonial.id}>
								<CardHeader>
									<div className='flex items-center gap-2'>
										{[...Array(testimonial.rating)].map(
											(_, i) => (
												<Star
													key={i}
													className='size-4 fill-primary text-primary'
												/>
											)
										)}
									</div>
									<CardTitle className='text-lg'>
										{testimonial.name}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className='text-muted-foreground'>
										&ldquo;{testimonial.text}&rdquo;
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</Container>
			</section>

			{/* CTA Section */}
			<section className='py-16 bg-gradient-to-r from-primary to-secondary text-white'>
				<Container>
					<div className='text-center space-y-6'>
						<h2 className='text-3xl md:text-4xl font-bold'>
							Ready to Create Magical Memories?
						</h2>
						<p className='text-xl opacity-90'>
							Join thousands of San Antonio families who have
							trusted us with their special celebrations. Book
							your party today!
						</p>
						<div className='flex flex-col sm:flex-row gap-4 justify-center'>
							<Button
								size='lg'
								variant='secondary'
								className='text-lg px-8'
							>
								<Calendar className='size-5 mr-2' />
								Book Your Party Now
							</Button>
							<Button
								size='lg'
								variant='outline'
								className='text-lg px-8 border-white text-black hover:bg-white hover:text-primary'
								asChild
							>
								<a
									href={`tel:${SITE_CONFIG.phone.replace(
										/\D/g,
										''
									)}`}
								>
									<Phone className='size-5 mr-2' />
									Call: {SITE_CONFIG.phone}
								</a>
							</Button>
						</div>
					</div>
				</Container>
			</section>
		</div>
	);
}
