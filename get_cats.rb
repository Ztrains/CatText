require 'httparty'
require 'pp'
 
def get_url
	url = 'http://thecatapi.com/api/images/get?format=xml&results_per_page=1'
	response = HTTParty.get(url)
	pic = response.parsed_response['response']['data']['images']['image'].first
	url = pic.last
end
