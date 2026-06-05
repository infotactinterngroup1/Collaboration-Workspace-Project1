import { Mail, MessageSquare, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Contact() {
  return (
    <div className="container max-w-screen-xl py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Contact Info & FAQs */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Get in touch
          </h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-md">
            Have a question about a product, your order, or just want to say hi? We'd love to hear from you.
          </p>

          <div className="space-y-8 mb-12">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Email us</h3>
                <p className="text-muted-foreground">Our friendly team is here to help.</p>
                <a href="mailto:hello@aistore.com" className="text-primary hover:underline font-medium mt-1 inline-block">
                  hello@aistore.com
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Office</h3>
                <p className="text-muted-foreground">Come say hello at our HQ.</p>
                <p className="font-medium mt-1">100 Innovation Drive<br />San Francisco, CA 94103</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Phone</h3>
                <p className="text-muted-foreground">Mon-Fri from 8am to 5pm.</p>
                <a href="tel:+1(555)000-0000" className="text-primary hover:underline font-medium mt-1 inline-block">
                  +1 (555) 000-0000
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-card rounded-3xl p-8 md:p-10 shadow-lg border">
          <div className="flex items-center gap-3 mb-8">
            <MessageSquare className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">Send us a message</h2>
          </div>
          
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">First name</label>
                <Input placeholder="Jane" className="h-12 bg-background" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Last name</label>
                <Input placeholder="Doe" className="h-12 bg-background" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input type="email" placeholder="jane@example.com" className="h-12 bg-background" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <textarea 
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[150px] resize-y"
                placeholder="How can we help?"
              />
            </div>

            <Button type="submit" size="lg" className="w-full h-14 rounded-xl text-lg mt-4">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
