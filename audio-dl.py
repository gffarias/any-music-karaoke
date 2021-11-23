url = input()
from pytube import YouTube
yt = YouTube(url)
st = yt.streams.filter(only_audio=True).order_by(attribute_name='abr').last()
video_codec, audio_codec = st.parse_codecs()
filename = f'{yt.video_id}.{audio_codec}'
st.download(output_path='cache/download', filename=filename)
print(filename)