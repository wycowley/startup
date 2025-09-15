## EC2

EC2 is used to create virtual servers.
98.88.66.16 is the public, elastic, associated id of my EC2 instance
My key pair is development.pem

You can access the EC2 instance using the CLI or you can access the website using the public IP address.
Website: http://98.88.66.16/
CLI: ssh -i development.pem ubuntu@98.88.66.16

### Important notes

-   Never share the `.pem` file with anyone
-   At the end of the process, disallocate the elastic IP with the EC2 instance to avoid fees

## Route 53

Route 53 is used to register domain names and route traffic to the correct server.
I registered the domain dropamemory.click, and linked it to the EC2 instance using an A record.

After buying the domain name, I went to create a new record in the subpanel "hosted zones". Then I hit "create record" and added in my public IP address which makes it map over.
