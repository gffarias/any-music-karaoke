url = input()
from pytube import YouTube
yt = YouTube(url)
st = yt.streams.filter(only_audio=True).order_by(attribute_name='abr').last()
ext = st.mime_type.split('/')[1]
# title, artist = yt.description.split('\n')[2].split(' · ')
filename = f'{yt.video_id}.{ext}'
st.download(output_path='public/assets/download', filename=filename)
print(filename)