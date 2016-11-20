require 'rubygems' # not necessary with ruby 1.9 but included for completeness
require 'twilio-ruby'
require 'httparty'

def get_url
	url = 'http://thecatapi.com/api/images/get?format=xml&results_per_page=1'
	response = HTTParty.get(url)
	pic = response.parsed_response['response']['data']['images']['image'].first
	url = pic.last
	return url
end

# put your own credentials here
account_sid = 'redacted'
auth_token = 'redacted'

# set up a client to talk to the Twilio REST API
@client = Twilio::REST::Client.new account_sid, auth_token

@client.account.messages.create({
  :from => 'redacted',
  :to => 'redacted', 
  :body => 'Enjoy your random cat picure! Please tell me how it looks! Reply with \'another\' (without the quotes) to get another picture at any time.',
  :media_url => get_url,
})

