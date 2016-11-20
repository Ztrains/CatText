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
account_sid = 'ACeaa280d9211108bdd7849a5bebc0c871'
auth_token = '889e2413fb0df584cd3ccceebe22146a'

# set up a client to talk to the Twilio REST API
@client = Twilio::REST::Client.new account_sid, auth_token

@client.account.messages.create({
  :from => '+15028909125',
  :to => '+16149156527', 
  :body => 'Enjoy your random cat picure! Please tell me how it looks! Reply with \'another\' (without the quotes) to get another picture at any time.',
  :media_url => get_url,
})

